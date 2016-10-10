import callSendAPI from "../send-requests";
import NotifyModel from "./notify-model";

async function findUserId(id) {
  const response = await NotifyModel.find({ recipient: id }).lean();
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

async function notify(recipientId) {
  const whatFuserIdHas = await findUserId(recipientId);
  const actionData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "𝐅𝐗 𝐔𝐩𝐝𝐚𝐭𝐞𝐬 \nYou'll receive market updates every 3 hours until unsubscribed.",
          buttons: [whatFuserIdHas]
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
      text: "Notification status updated - Subscribed"
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


function removeFromList(recipientId) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Notification status updated - unSubscribed"
    }
  }
  try {
    NotifyModel.find({ recipient: recipientId}).remove().exec();
    callSendAPI(actionData);
  } catch (e) {
    console.log("Error trying to remove recipient id", e);
  }
}


export default { notify, addToList, removeFromList };
