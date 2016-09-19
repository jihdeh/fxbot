import transform from "../util/transform";


export default function generate(text) {
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
