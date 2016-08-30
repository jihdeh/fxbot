import request from "request";


function sendGettingStartedBtn() {
  const messageData = {
    setting_type: "call_to_actions",
    thread_state: "new_thread",
    call_to_actions: [{
      "payload": "GETTING_STARTED_PAYLOAD"
    }]
  }
  gettingStartedThread(messageData);
}

function gettingStartedThread(messageData) {
  request({
    uri: "https://graph.facebook.com/v2.6/me/thread_settings",
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, (err, response, body) => {
    console.log(body, response);
  })
}

export default sendGettingStartedBtn;
