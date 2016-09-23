import RequestModel from "../model/request";
import AbokiModel from "../model/aboki";
import crypto from "crypto";

async function AddRequest(recipientID, text) {
  try {
    const findRequester = await RequestModel.findOne({ requester: recipientID, isRequesting: { $eq: true } }).lean();
    if (findRequester) {
      return "Hello, you currently have a request hanging \nIf you want to cancel this request, just send cancel";
    } else {
      const buf = crypto.randomBytes(3);
      const requestKey = buf.toString('hex');
      const addNewRequest = new RequestModel(Object.assign({}, {
        requester: recipientID,
        requestID: requestKey,
        isRequesting: true
      }));
      addNewRequest.save();
    }
  } catch (error) {
    console.trace("Error occured adding request", error);
  }
  return;
}



function broadcastRequest(text) {
  const getAllAbokis = await AbokiModel.find({inSession: false, banned: false});
  try {
      let promises = userIds.map((value) => sendRates(value.recipient, rates));
      let results = await Promise.all(promises);
      console.log(results);
    } catch (e) {
      console.log(e, "error occured posting fb broadcast");
    }
}

async function RemoveRequest(recipientID) {
  const findRequester = await RequestModel.findOne({ requester: recipientID }).lean();
  if (findRequester) {
    RequestModel.findOneAndRemove({ requester: recipientID }, () => {});
    return "Request has been cancelled";
  } else {
    return "You had no existing requests";
  }
  return;
}

export default { AddRequest, RemoveRequest }
