import Rates from "./get-rates";
import wordAI from "../../app/util/word-ai";
import moment from "moment";

async function listener(text) {
  const rates = await Rates();

  const parallel = wordAI.generalRates.includes(text);

  if (parallel) {
    const endRatesResult = `Todays rates on ${moment().format("MMMM Do YYYY")} at ${moment().utcOffset(1).format("h:mm:ss a")} \n\nUSD => ${rates.parallel.usd} \nGBP => ${rates.parallel.gbp} 
EUR => ${rates.parallel.eur} \n\nCURRENCY => BUY / SELL`;
    return endRatesResult;
  }
}

export default listener;
