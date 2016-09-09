import callSendAPI from "../send-requests";
import NotifyModel from "./notify-model";

function* findUserId(id) {
  const user = new NotifyModel();
  return yield user.find({ recipient: id });
}

function notify(recipientId) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "FX Uᴘᴅᴀᴛᴇs \nYou'll receive market updates throughout the day every 3 hours.",
          buttons: [{
            type: "postback",
            title: "Enable Notification",
            payload: "PAYLOAD_NOTIFY_ENABLE"
          }]
        }
      }
    }
  }
  callSendAPI(actionData);
}


function addToList(recipientId) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Notification status updated"
    }
  }
  try {
    const list = new NotifyModel();
    list.recipient = recipientId;
    list.save();
    callSendAPI(actionData);
  } catch (e) {
    console.log("Error trying to save recipient id", e);
  }
}


export default { notify, addToList };
