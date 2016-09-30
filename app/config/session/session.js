import callSendAPI from "../send-requests";
import SessionModel from "../../model/session";
import AbokiModel from "../../model/aboki";

//TODO: make sure to set insession to tru after aboki accepts req

function sendMessagesToParty(abokiID, recipientID) {
  const IDs = [abokiID, recipientID];
  console.lof(IDs, "00---------")
  for (let id of IDs) {
    console.log("the ids ohhhh", id);
    const actionData = {
      recipient: {
        id: id
      },
      message: {
        text: "You are now connected, please send a message"
      }
    };
    callSendAPI(actionData)
  }
}

export default async function findSessionData(sessionID, abokiID) {
  const findSession = await SessionModel.findOne({ sessionId: sessionID, aboki: { $exists: true } }).lean();
  if (findSession) {
    return "Sorry this session is already taken, you will be notified when there's another";
  } else {
    SessionModel.findOneAndUpdate({ sessionId: sessionID }, { aboki: abokiID }, {upsert:true}, (err, doc) => {});
    AbokiModel.findOneAndUpdate({ abokiID: abokiID }, { inSession: true }, {upsert:true}, (err, doc) => {});
    await sendMessagesToParty(abokiID, findSession.requester);
  }
}
