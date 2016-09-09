import report from "./text-responder";
import callSendAPI from "../../app/config/send-requests";
import { forEach } from "lodash";
import NotifyModel from "../../app/config/notification/notify-model";

function sendRates(recipientId, message) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: message
    }
  }
  callSendAPI(actionData);
}

async function publishRates() {
  const rates = await report("rates");
  const userIds = await NotifyModel.find().lean();
  console.log(userIds)
  if (userIds.length > 0) {
    try {
      (userIds).forEach((value, key) => {
        sendRates(value.recipient, rates);
      })
    } catch (e) {
      console.log(e, "error occured posting fb broadcast");
    }
  }
};

export default publishRates;
