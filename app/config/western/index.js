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
    // let x = JSON.stringify(recentData);
    // let y = JSON.parse(x);
    // storeWURates.push(y);
    storeWURates = {
        usd: $(get(recentData, "[1]")).text().trim(),
        gbp: $(get(recentData, "[2]")).text().trim(),
        eur: $(get(recentData, "[3]")).text().trim()
      };
    console.log(storeWURates)
    return storeWURates;
  });

  // const wu0 = JSON.parse(JSON.stringify($(get(storeWURates, "[0][0]")).text().split("\n")));
  return storeWURates;
}
