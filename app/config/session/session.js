import callSendAPI from "../send-requests";
import SessionModel from "../../model/session";
import AbokiModel from "../../model/aboki";

//TODO: make sure to set insession to tru after aboki accepts req

function sendMessagesToParty(abokiID, recipientID) {
  const IDs = [abokiID, recipientID];
  for (let id of IDs) {
    const actionData = {
      recipient: {
        id: id
      },
      message: {
        text: "You are now connected, please send a message"
      }
    }
    callSendAPI(actionData)
  }
  return;
}

export default async function findSessionData(sessionID, abokiID) {
  const findSession = await SessionModel.findOne({ sessionId: sessionID, aboki: { $exists: true } }).lean();
  console.log(findSession, "inSession", sessionID, abokiID);
  if (findSession) {
    return "Sorry this session is already taken, you will be notified when there's another";
  } else {
    SessionModel.findOneAndUpdate({ sessionID: sessionID }, { aboki: abokiID }, {upsert:true}, (err, doc) => {
      console.log("errrrr", err, "====", doc)
    });
    AbokiModel.findOneAndUpdate({ abokiID: abokiID }, { inSession: true }, {upsert:true});
    //TODO: send message to requester that they are connected,
    sendMessagesToParty(abokiID, findSession.requester);
    //TODO: send message to aboki as well.
    // return "You are now connected to the customer, you can send a message";
  }
}
