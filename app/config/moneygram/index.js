import cheerio from "cheerio";
import {get } from "lodash";

export default function MoneyGramRates(html) {
  let $ = cheerio.load(html);

  let storeMoneyGramRates = {};
  $(".moneygram-rate .table-line").first().filter(function() {
    let data = $(this);
    let recentData = data.contents().map(function(i, el) {
      return $(this).html();
    }).get();
    storeMoneyGramRates = {
        usd: $(get(recentData, "[1]")).text().trim(),
        gbp: $(get(recentData, "[2]")).text().trim(),
        eur: $(get(recentData, "[3]")).text().trim()
      };
    return storeMoneyGramRates;
  });
  return storeMoneyGramRates;
}
