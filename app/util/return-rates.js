export default function returnRates(text, rates) {
  let newText = text.split(" ");
  switch(newText[0]) {
    case "convert":
      return {
      "USD": rates.parallel.usd.split(" ")[0],
      "GBP": rates.parallel.gbp.split(" ")[0],
      "EUR": rates.parallel.eur.split(" ")[0],
      "NGN": 1
    };
    break;
    case "wu": 
      return {
      "USD": rates.wu.usd,
      "GBP": rates.wu.gbp,
      "EUR": rates.wu.eur,
      "NGN": 1
    };
    break;
    case "cbn":
      return {
      "USD": rates.cbn.usd,
      "GBP": rates.cbn.gbp,
      "EUR": rates.cbn.eur,
      "NGN": 1
    };
    break;
    default:
      return null;
  }
}
