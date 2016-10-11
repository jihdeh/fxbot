import callSendAPI from "../send-requests";
import SessionModel from "../../model/session";
import AbokiModel from "../../model/aboki";
import {get} from "lodash";

function servicify(id, text) {
  const actionData = {
    recipient: {
      id: id
    },
    message: {
      text: text
    }
  };
  callSendAPI(actionData);
};

async function findSessionData(sessionID, abokiID) {
  const findSession = await SessionModel.findOne({ sessionId: sessionID }).lean().exec();
  if(!findSession) {
    servicify(abokiID, "Request no longer available");
  }
  if (findSession.aboki && findSession.aboki === abokiID) {
    servicify(abokiID, "Sorry this session is already taken by you, if you want to cancel, just send > aboki cancel");
  } else if(findSession.aboki) {
    servicify(abokiID, "Sorry this session is already taken, you will be notified when there's another");
  }
  else {
    SessionModel.findOneAndUpdate({ sessionId: sessionID }, { aboki: abokiID }, { upsert: true }, (err, doc) => {});
    AbokiModel.findOneAndUpdate({ abokiID: abokiID }, { inSession: true, sessionId: sessionID }, { upsert: true }, (err, doc) => {});
    let IDs = [abokiID, findSession.requester];
    for (let id of IDs) {
      servicify(id, "You are now connected, please send a message")
    }
  }
}
export default findSessionData;
