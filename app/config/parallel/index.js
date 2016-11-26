import cheerio from "cheerio";
import {get } from "lodash";

export default function fetchParallelRates(html) {
  //if there no other results
  //either the first or the second function must return results that are not empty strings
  let $ = cheerio.load(html);

  function getFirstResult() {
    let parallelRates = [];
    $(".entry-content table tbody").first().filter(function() {
      let data = $(this);
      let recentData = data.contents().map(function(i, el) {
        return $(this).html();
      }).get();
      parallelRates.push({
        usd: $(get(recentData, "[3]")).text(),
        gbp: $(get(recentData, "[4]")).text(),
        eur: $(get(recentData, "[5]")).text()
      });
    });
    return parallelRates;
  }

  function getNextResult() {
    let parallelRates = [];
    $(".entry-content table tbody tr").first().next().next().filter(function() {
      let data = $(this);
      let recentData = data.contents().map(function(i, el) {
        return $(this).html();
      }).get();
      parallelRates.push({
        usd: $(get(recentData, "[1]")).text(),
        gbp: $(get(recentData, "[2]")).text(),
        eur: $(get(recentData, "[3]")).text()
      });
    });
    return parallelRates;
  }
  const firstFn = getFirstResult();
  const secondFn = getNextResult();
  const passRatesDown = (get(secondFn, "[0].usd") !== "") ? secondFn[0] : firstFn[0];
  return passRatesDown;
}
