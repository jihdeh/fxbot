import cheerio from "cheerio";
import {get } from "lodash";

export default function MoneyGramRates(html) {
  let $ = cheerio.load(html);

  let storeMoneyGramRates = [];
  $(".entry-content table").last().prev().prev().prev().next().filter(function() {
    let data = $(this);
    let recentData = data.contents().map(function(i, el) {
      return $(this).html();
    }).get();
    let x = JSON.stringify(recentData);
    let y = JSON.parse(x);
    storeMoneyGramRates.push(y);
  });
  const moneyGram0 = JSON.parse(JSON.stringify($(get(storeMoneyGramRates, "[0][0]")).text().split("\n")));
  return moneyGram0;
}
