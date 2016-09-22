import cheerio from "cheerio";
import {get } from "lodash";

export default function WesternRates(html) {
  let storeWURates = [];
  let $ = cheerio.load(html);

  $(".entry-content table").last().prev().prev().prev().prev().filter(function() {
    let data = $(this);
    let recentData = data.contents().map(function(i, el) {
      return $(this).html();
    }).get();
    let x = JSON.stringify(recentData);
    let y = JSON.parse(x);
    storeWURates.push(y);
  });

  const wu0 = JSON.parse(JSON.stringify($(get(storeWURates, "[0][0]")).text().split("\n")));
  return wu0;
}
