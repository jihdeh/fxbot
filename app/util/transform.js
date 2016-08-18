import allowedCurrencies from "./allowed-currency";

function transform(currencyName) {
  let caseCurrency = (currencyName !== undefined && currencyName) ? currencyName.toLowerCase() : false;
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

export default transform;
