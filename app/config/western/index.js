import cheerio from "cheerio";
import {get } from "lodash";

export default function WesternRates(html) {
  let storeWURates = {};
  let $ = cheerio.load(html);

  $(".westren-union .table-line").first().filter(function() {
    let data = $(this);
    let recentData = data.contents().map(function(i, el) {
      return $(this).html();
    }).get();
    storeWURates = {
        usd: $(get(recentData, "[1]")).text().trim(),
        gbp: $(get(recentData, "[2]")).text().trim(),
        eur: $(get(recentData, "[3]")).text().trim()
      };
    return storeWURates;
  });
  return storeWURates;
}
