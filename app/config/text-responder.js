import callSendAPI from "./send-requests";

let string = "convert 100 usd to naira";
const rates = ` USD => 390 \n GBP => 500 \n EUR => 420`;

// [
//   {
//     "USD": "390",
//     "GBP": "500",
//     "EUR": "420"
//   }
// ]

function listener(text) {
  if(text === "rates" || text === "rate") {
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
  try {
    callSendAPI(messageData);
  } catch(error) {
    console.log("An error occured");
  }
}

export default sendTextMessage;
