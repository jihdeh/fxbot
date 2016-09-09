import callSendAPI from "../send-requests";

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
          text: "Breaking News \nYou'll receive market updates throughout the day every 3 hours.",
          buttons: [{
            type: "postback",
            title: "Enable Notification",
            payload: "USER_DEFINED_PAYLOAD"
          }]
        }
      }
    }
  }
  callSendAPI(actionData);
}


  export default notify;
