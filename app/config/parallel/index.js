import cheerio from "cheerio";
import {get } from "lodash";

export default function fetchParallelRates(html) {
  //if there no other results
  //either the first or the second function must return results that are not empty strings
  let $ = cheerio.load(html);

  function getFirstResult() {
    let parallelRates = {};
    $(".table-line").first().filter(function() {
      let data = $(this);
      let recentData = data.contents().map(function(i, el) {
        return $(this).html();
      }).get();
      parallelRates = {
        usd: get(recentData, "[1]"),
        gbp: get(recentData, "[2]"),
        eur: get(recentData, "[3]")
      };
    });
    return parallelRates;
  }
  return getFirstResult();
}
