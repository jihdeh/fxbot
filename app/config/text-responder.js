import callSendAPI from "./send-requests";
import fx from "money";
import numbro from "numbro";
import transform from "../util/transform";
import fetchRates from "./web-scraper";
import request from "request";
let API_BASE = "https://api.myjson.com/bins/186hf";


// import ratez from "../util/rates";
const ratez = fetchRates.v[0];

// fetchRates.getRates(data => {
//   ratez = data;
//   return ratez;
// });

// setTimeout(() => {
//   let v = fetchRates.v;
//   console.log(v);
// }, 9000)

if (ratez) {
  console.log("YAAAAAAAA", ratez)



  fx.base = "NGN";
  fx.settings = { from: "NGN" };
  fx.rates = {
    "USD": ratez.usd.split(" ")[0],
    "GBP": ratez.gbp.split(" ")[0],
    "EUR": ratez.eur.split(" ")[0],
    "NGN": 1
  }
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
    request.get({ url: API_BASE, json: true }, (err, res, body) => {
      const rates = `Todays Rates \n\nUSD => ${body.usd} \nGBP => ${body.gbp} 
EUR => ${body.eur} \n\nCURRENCY => BUY / SELL \nData pulled from http://abokifx.com`;
      console.log(rates)
      return rates;
    });
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
      return "Sorry there was a problem processing your command \nPlease check the commands on the facebook page \n \
      @ https://facebook.com/fxbot0";
    }
    return numbro(value).format('0,0') + " naira, is what you will get on parallel market";
  }
}

listener("rates");

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
