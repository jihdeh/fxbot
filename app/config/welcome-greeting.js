import request from "request";

function sendGreetingText() {
  const messageData = {
    setting_type: "greeting",
    greeting: {
      "text": "Welcome to NAIRABOT, instant Foreign exchange bot at your service"
    }
  }
  callSendGreetingText(messageData);
}

function callSendGreetingText(messageData) {
  request({
    uri: "https://graph.facebook.com/v2.6/me/thread_settings",
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  })
}



export default sendGreetingText;
