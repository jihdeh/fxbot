import callSendAPI from "./send-requests";
import fx from "money";

let string = "convert 100 usd to naira";
const rates = `USD => 390 \nGBP => 505 \nEUR => 420`;

// [
//   {
//     "USD": "390",
//     "GBP": "500",
//     "EUR": "420"
//   }
// ]
fx.base = "NGN";
fx.rates = {
  "USD": 390,
  "GBP": 505,
  "EUR": 420,
  "NGN": 1
}

function listener(text) {
  if (text === "rates" || text === "rate") {
    return rates;
  } else {
    string.split(" ");
    let amount = string[1];
    let currencyFrom = string[2];
    let currencyTo = string[4];

    console.log(string[1]);
    return fx.convert(amount, {from: currencyFrom, to: currencyTo});
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
  } catch (error) {
    console.log("An error occured");
  }
}

export default sendTextMessage;
