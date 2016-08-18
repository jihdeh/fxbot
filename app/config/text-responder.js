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
  let currencyFromText = newText[2] ? newText[2].toUpperCase() : null;
  let currencyToText = newText[4] ? newText[4].toUpperCase() : null;
  let fromCurrency = transform(currencyFromText);
  let toCurrency = transform(currencyToText);
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
  text = text.toLowerCase();
  if (text === "rates" || text === "rate") {
    return rates;
  } else {
    const response = generate(text);
    console.log(response);
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
      return "Sorry there was a problem processing your command \nPlease check the commands on the facebook page \n \
      @ https://facebook.com/fxbot0";
    }
    console.log(numbro(value).format('0,0'));
    return numbro(value).format('0,0');
  }
}

listener("adadad")

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
