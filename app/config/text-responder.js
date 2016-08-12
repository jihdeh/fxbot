import callSendAPI from "./send-requests";
import fx from "money";

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
    console.log("else enter here", text)
    let newText = newText.split(" ");
    let amount = newText[1];
    let currencyTo = newText[2].toUpperCase();
    let currencyFrom = newText[4].toUpperCase();
    console.log(newText, amount, currencyTo, currencyFrom, "----")
    let vv = fx.convert(amount, {from: currencyFrom, to: currencyTo});
    console.log(vv, "vv")
    return fx.convert(amount, {from: currencyFrom, to: currencyTo});
  }
}


function sendTextMessage(recipientId, messageText) {
  const response = listener(messageText);
  console.log(response, "-----response")
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
