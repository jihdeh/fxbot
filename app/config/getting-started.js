// import request from "request";


// function sendGettingStartedBtn() {
//   const messageData = {
//     setting_type: "call_to_actions",
//     thread_state: "new_thread",
//     call_to_actions: [{
//       "payload": "PAYLOAD_GETTING_STARTED"
//     }]
//   }
//   gettingStartedThread(messageData);
// }

// function gettingStartedThread(messageData) {
//   request({
//     uri: "https://graph.facebook.com/v2.6/me/thread_settings",
//     qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
//     method: 'POST',
//     json: messageData
//   }, (err, response, body) => {
//     console.log(body, response);
//   })
// }

// export default sendGettingStartedBtn;

// curl -X POST -H "Content-Type: application/json" -d '{
//   "setting_type" : "call_to_actions",
//   "thread_state" : "existing_thread",
//   "call_to_actions":[
//     {
//       "type":"postback",
//       "title":"Help",     
//       "payload":"PAYLOAD_HELP"     },
//    {
//       "type":"postback",
//      "title":"Get Parallel Market Rates",
//       "payload":"PAYLOAD_PARALLEL"
//   }
//   ]
//  }' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAHQl22ysgcBAOZBz5uEgUNxSfzjfsZCh4WklAfGmmaJHMtxTlZBsXvZCZC9lzb0krjKljQIerkd0GG3UarVueGT7AP3wV0s9hj1tmeQauakxwmNAMmaply03WSqKecZBsiIWkjHNP2sgQQP3ZBB1JnMeKB4jZBx3SORxgpTCvMZAEAZDZD"
