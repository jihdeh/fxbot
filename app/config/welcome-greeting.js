import request from "request";

function sendGreetingText() {
  const messageData = {
    setting_type: "greeting",
    greeting: {
      "text": "Welcome to NAIRABOT, a quick Foreign exchange bot at your service"
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



// {
//   "setting_type":"call_to_actions",
//   "thread_state":"new_thread",
//   "call_to_actions":[
//     {
//       "payload":"USER_DEFINED_PAYLOAD"
//     }
//   ]
// }' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"      
// Fields




export default sendGreetingText;
