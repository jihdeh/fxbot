import RequestModel from "../model/request";
import AbokiModel from "../model/aboki";
import SessionModel from "../model/session";
import crypto from "crypto";
import callSendAPI from "../config/send-requests";

async function AddRequest(recipientID, text) {
  try {
    const findRequester = await RequestModel.findOne({ requester: recipientID, isRequesting: { $eq: true } }).lean();
    console.log(findRequester)
    if (findRequester) {
      return "Hello, you currently have a request hanging \nIf you want to cancel this request, just send cancel";
    } else {
      const buf = crypto.randomBytes(3);
      const sessionID = buf.toString('hex');
      const addNewRequest = new RequestModel(Object.assign({}, {
        requester: recipientID,
        requestID: sessionID,
        isRequesting: true //set to false after deal is sealed
      }));
      addNewRequest.save().then(async() => {
        console.log(sessionID, "after save");
        const session = new SessionModel(
          Object.assign({}, {
            sessionId: sessionID,
            requester: recipientID
          }));
        session.save();
        await broadcastRequest(text, sessionID);
      });
    }
  } catch (error) {
    console.trace("Error occured adding request", error);
  }
  return;
}

async function template(recipientId, requestText, payload) {
  console.log(recipientId, requestText, payload, "====template")
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

async function broadcastRequest(text, sessionID) {
  //TODO: send now making your request.....
  const getAllAbokis = await AbokiModel.find({ inSession: false, banned: false });
  console.log("abokies", getAllAbokis)
  if (getAllAbokis.length) {
    try {
      let promises = getAllAbokis.map(async(value) => await template(value.abokiID, text, sessionID));
    } catch (e) {
      console.log(e, "error occured posting fb broadcast");
    }
  } else {
    return "Sorry there are currently no Abokis available, please try later";
  }
}

async function RemoveRequest(recipientID) {
  const findRequester = await RequestModel.findOne({ requester: recipientID }).lean();
  if (findRequester) {
    RequestModel.findOneAndRemove({ requester: recipientID }, () => {});
    SessionModel.findOneAndRemove({ requester: recipientID }, () => {});
    return "Request has been cancelled";
  } else {
    return "You had no existing requests";
  }
  return;
}

export default { AddRequest, RemoveRequest }
