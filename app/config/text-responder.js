import callSendAPI from "./send-requests";
import fx from "money";
import numbro from "numbro"
import transform from "../util/transform";
import Rates from "./web-scraper";
import returnRates from "../util/return-rates";
import wordAI from "../util/word-ai";
import helpText from "../util/helper-text";
import notifier from "./notification"

fx.base = "NGN";
fx.settings = { from: "NGN" };

function currencyResponse(text) {
  switch (text) {
    case "USD":
      return "Dollars";
      break;
    case "GBP":
      return "Pounds";
      break;
    case "EUR":
      return "Euro";
      break;
    default:
      return "naira";
      break;
  }
}

function generate(text) {
  let newText = text.split(" ");
  let fromCurrency, toCurrency, amount;
  if (newText[0] === "convert") {
    let currencyFromText = newText[2] ? newText[2].toUpperCase() : null;
    let currencyToText = newText[4] ? newText[4].toUpperCase() : null;
    fromCurrency = transform(currencyFromText);
    toCurrency = transform(currencyToText);
    amount = newText[1];
  } else if (newText[0] === "wu") {
    let currencyFromText = newText[3] ? newText[3].toUpperCase() : null;
    let currencyToText = newText[5] ? newText[5].toUpperCase() : null;
    fromCurrency = transform(currencyFromText);
    toCurrency = transform(currencyToText);
    amount = newText[2];
  }

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

async function listener(text) {
  const rates = await Rates.getRates();
  fx.rates = returnRates(text, rates);

  const parallel = wordAI.generalRates.includes(text);
  const wu = wordAI.westernRates.includes(text);
  const cbn = wordAI.cbnRates.includes(text);

  if (parallel) {
    const endRatesResult = `Todays Rates \n\nUSD => ${rates.parallel.usd} \nGBP => ${rates.parallel.gbp} 
EUR => ${rates.parallel.eur} \n\nCURRENCY => BUY / SELL`;
    return endRatesResult;
  } else if (wu) {
    const endWuRatesResult = `Todays Western Union Rates(receiving) \n\nUSD => ${rates.wu.usd} \nGBP => ${rates.wu.gbp} 
EUR => ${rates.wu.eur} \n\nCURRENCY => BUY / SELL`;
    return endWuRatesResult;
  } else if (cbn) {
    const endCbnRatesResult = `Todays CBN EX Rates \n\nUSD => ${rates.cbn.usd} \nGBP => ${rates.cbn.gbp} 
EUR => ${rates.cbn.eur} \n\nCURRENCY => BUY / SELL`;
    return endCbnRatesResult;
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
      return "😔 Sorry there was a problem processing your command \nPlease 🙏 check the commands on the facebook page \n \
      @ https://facebook.com/nairabot";
    }
    return numbro(value).format('0,0') + " " + currencyResponse(response.convertCurrencyTo) + ", is what you will get in return ✌️";
  }
}

async function sendTextMessage(recipientId, messageText, postback) {
  let response;
  messageText = messageText.toLowerCase();
  if (postback === "help") {
    response = messageText
  } else if (messageText === "help" || messageText === "hi" || messageText === "hello") {
    response = helpText;
  } else if (messageText === "naira sub" || messageText === "sub") {
    notifier.addToList(recipientId);
  } else if (messageText === "unsub" || messageText === "naira unsub") {
    notifier.removeFromList(recipientId);
  } else {
    response = await listener(messageText);
  }
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
