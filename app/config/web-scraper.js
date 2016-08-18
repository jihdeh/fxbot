import request from "request";
import cheerio from "cheerio";
import fs from "fs";

let url = "http://abokifx.com";

function scrape() {
  request(url, function(error, response, html) {
    if (!error) {

      let $ = cheerio.load(html);
      $(".entry-content table tbody").first().filter(function() {
        let data = $(this);
        let recentData = data.contents().children().map(function(i, el) {
          return $(this).html();
        }).get();
        let USD = $(recentData[9]).text();
        let GBP = $(recentData[10]).text();
        let EUR = $(recentData[11]).text();

        const result = {
          "usd": USD,
          "gbp": GBP,
          "eur": EUR
        };

        fs.writeFileSync(`./app/util/rates.json`, JSON.stringify(result, null, 2), { encoding: 'utf8' });
      });
    }
  });

}

export default scrape;
