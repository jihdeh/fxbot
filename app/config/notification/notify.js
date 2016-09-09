import callSendAPI from "../send-requests";
import NotifyModel from "./notify-model";

async function findUserId(id) {
  const response = await NotifyModel.find({ recipient: id }).lean().exec();
  console.log(response, "i enter")
  if (response.length > 0) {
    return {
      type: "postback",
      title: "Disable Notification",
      payload: "PAYLOAD_NOTIFY_DISABLE"
    }
  } else {
    return {
      type: "postback",
      title: "Enable Notification",
      payload: "PAYLOAD_NOTIFY_ENABLE"
    }
  }
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
          text: "𝐅𝐗 𝐔𝐩𝐝𝐚𝐭𝐞𝐬 \nYou'll receive market updates throughout the day every 3 hours.",
          buttons: [(async function btn(){ await findUserId(recipientId)}())]
        }
      }
    }
  }
  console.log(JSON.stringify(actionData.message.attachment.payload));
  // callSendAPI(actionData);
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
    console.log(list, "========");
    callSendAPI(actionData);
  } catch (e) {
    console.log("Error trying to save recipient id", e);
  }
}


export default { notify, addToList };
