import RequestModel from "../model/request";
import AbokiModel from "../model/aboki";
import SessionModel from "../model/session";
import crypto from "crypto";
import callSendAPI from "../config/send-requests";


function servicify(recipientID, text) {
  const actionData = {
    recipient: {
      id: recipientID
    },
    message: {
      text: text
    }
  };
  callSendAPI(actionData);
}
async function AddRequest(recipientID, text) {
  try {
    const findRequester = await RequestModel.findOne({ requester: recipientID, isRequesting: { $eq: true } }).lean();
    const getAllAbokis = await AbokiModel.find({ inSession: false, banned: false }).lean();
    const isAboki = await AbokiModel.findOne({ abokiID: recipientID });
    if (isAboki) {
      servicify(recipientID, "You cannot make a request, because of your Aboki status \nyou can use => aboki remove, to be able to make requests");
      return;
    }
    if (findRequester) {
      servicify(recipientID, "Hello, you currently have a request hanging \nIf you want to cancel this request, just send cancel");
    } else if (!getAllAbokis.length) {
      servicify(recipientID, "Sorry there are currently no Abokis available, please try later");
    } else {
      const buf = crypto.randomBytes(3);
      const sessionID = buf.toString('hex');
      const addNewRequest = new RequestModel(Object.assign({}, {
        requester: recipientID,
        requestID: sessionID,
        isRequesting: true //set to false after deal is sealed
      }));
      broadcastRequest(text, sessionID, recipientID).then(() => {
        addNewRequest.save().then(() => {
          const session = new SessionModel(
            Object.assign({}, {
              sessionId: sessionID,
              requester: recipientID
            }));
          session.save();
        });
      });
    }
  } catch (error) {
    console.trace("Error occured adding request", error);
  }
}

async function template(recipientId, requestText, payload) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: requestText,
          buttons: [{
            type: "postback",
            title: "Accept Request",
            payload: payload
          }]
        }
      }
    }
  }
  callSendAPI(actionData);
}

async function broadcastRequest(text, sessionID, recipientID) {
  const getAllAbokis = await AbokiModel.find({ inSession: false, banned: false });
  try {
    let newText = text.split(" ");
    newText.shift();
    let newTextProp = newText.join(" ");
    if(newTextProp === "") {
      servicify(recipientID, "Sorry you need to enter more context to your message");
      throw new Error;
      return;
    }
    servicify(recipientID, "Now Broadcasting your request, please hold.....");
    let promises = getAllAbokis.map(async(value) => await template(value.abokiID, newTextProp, sessionID));
  } catch (e) {
    console.log(e, "error occured posting fb broadcast");
  }
}

async function RemoveRequest(uniqId) {
  const findRequester = await RequestModel.findOne({ requestID: uniqId }).lean();
  if (findRequester) {
    RequestModel.findOneAndRemove({ requestID: uniqId }, () => {});
    SessionModel.findOneAndRemove({ sessionId: uniqId }, () => {});
    AbokiModel.update({ sessionId: uniqId }, { inSession: false, sessionId: null }, () => {});
    return "Request has been cancelled";
  } else {
    return "You had no existing requests";
  }
  return;
}

export default { AddRequest, RemoveRequest }
