import request from "request";
import callSendAPI from "./sender_actions";

function sendActions(recipientId) {
  const actionData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  }
  callSendAPI(actionData);
}

// function callSendAction(actionData) {
//   request({
//     uri: "https://graph.facebook.com/v2.6/me/messages",
//     qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
//     method: 'POST',
//     json: actionData
//   })
// }


export default sendActions;
