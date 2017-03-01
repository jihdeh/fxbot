import cheerio from "cheerio";
import {get} from "lodash";

export default function fetchCbnRates(html) {
//if there no other results
//either the first or the second function must return results that are not empty strings
let $ = cheerio.load(html);
  function getFirstResult() {
    let cbnRates = {};
    $(".cbn-rate .table-line").first().filter(function() {
      let data = $(this);
      let recentData = data.contents().map(function(i, el) {
        return $(this).html();
      }).get();
      cbnRates = {
        usd: $(get(recentData, "[1]")).text().trim(),
        gbp: $(get(recentData, "[2]")).text().trim(),
        eur: $(get(recentData, "[3]")).text().trim()
      };
    });
    return cbnRates;
  }
  return getFirstResult();
}
