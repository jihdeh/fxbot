import callSendAPI from "./send-requests";

let string = "convert 100 usd to naira";
const rates = `USD => 390 | GBP => 500 | EUR => 420`;

// [
//   {
//     "USD": "390",
//     "GBP": "500",
//     "EUR": "420"
//   }
// ]

function listener(text) {
  console.log(text, text===rates)
  if(text === ("rates" || "rate")) {
    return rates;
  }
}


function sendTextMessage(recipientId, messageText) {
  const response = listener(messageText);
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: response
    }
  };
  callSendAPI(messageData);
}

export default sendTextMessage;
