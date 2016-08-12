import callSendAPI from "./send-requests";
import fx from "money";
import allowedCurrencies from "../util/allowed-currency";

const rates = `USD => 390 \nGBP => 505 \nEUR => 420`;

// [
//   {
//     "USD": "390",
//     "GBP": "500",
//     "EUR": "420"
//   }
// ]
fx.base = "NGN";
fx.settings = { from: "NGN" };
fx.rates = {
    "USD": 390,
    "GBP": 505,
    "EUR": 420,
    "NGN": 1
  }

function transform(currencyName) {
  let caseCurrency = (currencyName !== undefined) ? currencyName.toLowerCase() : false;
  if (allowedCurrencies.indexOf(currencyName) > -1) {
    if (currencyName === "USD" || caseCurrency === "dollars" || caseCurrency === "dollar") {
      return "USD";
    } else if (currencyName === "GBP" || caseCurrency === "pounds" || caseCurrency === "pound") {
      return "GBP";
    } else if (currencyName === "EUR" || caseCurrency === "euros" || caseCurrency === "euro") {
      return "EUR";
    } else if (currencyName === "NGN" || caseCurrency === "naira") {
      return "NGN";
    }
  } else {
    return false;
  }
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
// listener("convert 1000 pounds");

function listener(text) {
  if (text === "rates" || text === "rate") {
    return rates;
  } else {
    const response = generate(text);
    let value = "";
    if (response.convertCurrencyFrom && response.convertCurrencyTo) {
      value = fx.convert(response.amount, {
        from: response.convertCurrencyFrom,
        to: response.convertCurrencyTo
      });
      return value;
    } else if (response.convertCurrencyFrom) {
      value = fx.convert(response.amount, {
        to: response.convertCurrencyFrom
      });
    } else {
      return "Sorry there was a problem processing your command \nPlease check the commands";
    }
    console.log("value", value)
    return value;
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
