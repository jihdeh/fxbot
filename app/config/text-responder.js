import callSendAPI from "./send-requests";
import fx from "money";
import numbro from "numbro"
import Rates from "./web-scraper";
import returnRates from "../util/return-rates";
import wordAI from "../util/word-ai";
import helpText from "../util/helper-text";
import genericResponse from "../util/generic-response-text";
import notifier from "./notification";
import generate from "./conversion-generator";
import Aboki from "../bid-exchange/aboki";

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

async function listener(text) {
  const rates = await Rates.getRates();
  fx.rates = returnRates(text, rates);

  const parallel = wordAI.generalRates.includes(text);
  const wu = wordAI.westernRates.includes(text);
  const cbn = wordAI.cbnRates.includes(text);
  const moneygram = wordAI.moneygramRates.includes(text);

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
  } else if (moneygram) {
    const endmoneygramRatesResult = `Todays Moneygram EX Rates(receiving) \n\nUSD => ${rates.moneygram.usd} \nGBP => ${rates.moneygram.gbp} 
EUR => ${rates.moneygram.eur} \n\nCURRENCY => BUY / SELL`;
    return endmoneygramRatesResult;
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
      return "Command not recognized, did you want to try any of these? \n\
      \nwesty => for Western union rates \
      \ngrammy => from Moneygram rates \
      \ncbn rates => for Central Bank rates OR\
      \nrates => for Parallel market rates\
      \n Visit @ https://facebook.com/nairabot for more info";
    }
    return numbro(value).format('0,0') + " " + currencyResponse(response.convertCurrencyTo) + ", is what you will get in return ✌️";
  }
}

// sendTextMessage(1038184896296564, "aboki remove")

async function sendTextMessage(recipientId, messageText) {
  let response;
  messageText = messageText.toLowerCase();
  switch (true) {
    case messageText === "help":
      response = helpText;
      break;
    case genericResponse.greetings.includes(messageText):
      response = `Hi There!\nHow may i help you 🎩?`;
      break;
    case wordAI.abokiRm.includes(messageText):
      response = await Aboki.AbokiRemove(recipientId);
      break;
    case wordAI.aboki.includes(messageText):
      response = await Aboki.AbokiAdd(recipientId);
      break;
    case genericResponse.byes.includes(messageText):
      response = `Alright! Thank you, bye now 🙏`;
      break;
    case messageText === "naira sub":
    case messageText === "sub":
      return notifier.addToList(recipientId);
      break;
    case messageText === "unsub":
    case messageText === "naira unsub":
      return notifier.removeFromList(recipientId);
      break;
    default:
      response = await listener(messageText);
      break;
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
