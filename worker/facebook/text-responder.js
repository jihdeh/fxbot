import Rates from "../get-rates";
import moment from "moment";

async function listener() {
  const rates = await Rates();
  const endRatesResult = `PARALLEL MKT. RATES at ${moment().utcOffset(1).format("h:mm:ss a")} \n\nUSD => ${rates.parallel.usd} \nGBP => ${rates.parallel.gbp} 
EUR => ${rates.parallel.eur} \n\nCURRENCY => BUY / SELL \n\n---------------
\nCBN RATES  \n\nUSD => ${rates.cbn.usd} \nGBP => ${rates.cbn.gbp} 
EUR => ${rates.cbn.eur} \n\n---------------
\nWESTERN UNION(Receiving)  \n\nUSD => ${rates.wu.usd} \nGBP => ${rates.wu.gbp} 
EUR => ${rates.wu.eur}`;
  return endRatesResult;
}

export default listener;
