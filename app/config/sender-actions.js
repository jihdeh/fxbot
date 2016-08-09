import request from "request";
import callSendAPI from "./send-requests";

function sendTyping(recipientId) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  }
  callSendAPI(actionData);
}

//Apparently this isn't working on FB
//But it's on their doc
function sendMarkAsSeen(recipientId) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    sender_action: "mark_seen"
  }
  callSendAPI(actionData);
}

function sendActions(recipientId, senderID) {
  sendMarkAsSeen(recipientId);
}

export default sendActions;
