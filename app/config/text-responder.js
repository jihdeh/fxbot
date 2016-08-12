import callSendAPI from "./send-requests";
import fx from "money";
import numbro from "numbro"
import transform from "../util/transform";

const rates = `USD => 390 \nGBP => 505 \nEUR => 420`;

fx.base = "NGN";
fx.settings = { from: "NGN" };
fx.rates = {
    "USD": 390,
    "GBP": 505,
    "EUR": 420,
    "NGN": 1
  }

function generate(text) {
  let newText = text.split(" ");
  let fromCurrency = transform(newText[2]);
  let toCurrency = transform(newText[4]);
  let amount = newText[1];

  if (fromCurrency && toCurrency !== false && !isNaN(amount)) {
    const structure = {
      amount: amount,
      convertCurrencyFrom: fromCurrency,
      convertCurrencyTo: toCurrency
    }
    return structure;
  } else if (fromCurrency !== false && toCurrency === false && !isNaN(amount)) {
    const structure = {
      amount: amount,
      convertCurrencyFrom: fromCurrency
    }
    return structure;
  } else {
    return false;
  }
}

function listener(text) {
  if (text === "rates" || text === "rate") {
    return rates;
  } else {
    const response = generate(text);
    let value = "";
    if (response.convertCurrencyFrom && response.convertCurrencyTo) {
      value = fx.convert(response.amount, {
        to: response.convertCurrencyFrom,
        from: response.convertCurrencyTo
      });
    } else if (response.convertCurrencyFrom) {
      value = fx.convert(response.amount, {
        to: response.convertCurrencyFrom
      });
    } else {
      return "Sorry there was a problem processing your command \nPlease check the commands";
    }
    return numbro(value).format('0,0');
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
