import request from "request";
import cheerio from "cheerio";
import axios from "axios";

let API_BASE = process.env.JSON_RATES_STORE;
let url = "http://abokifx.com";

function scrape() {
  request(url, function(error, response, html) {
    if (!error) {
      let $ = cheerio.load(html);
      let parallelRates = [];
      $(".entry-content table tbody tr").first().next().next().filter(function() {
        let data = $(this);
        let recentData = data.contents().map(function(i, el) {
          return $(this).html();
        }).get();
        parallelRates.push({
          usd: $(recentData[1]).text(),
          gbp: $(recentData[2]).text(),
          eur: $(recentData[3]).text()
        });
      });
      let storeWURates = [];
      $(".entry-content table").next().next().next().filter(function() {
        let data = $(this);
        let recentData = data.contents().map(function(i, el) {
          return $(this).html();
        }).get();
        let x = JSON.stringify(recentData);
        let y = JSON.parse(x);
        storeWURates.push(y);
      });
      // console.log(JSON.parse(JSON.stringify(storeWURates[4])))
      const wu0 = JSON.parse(JSON.stringify($(storeWURates[4][0]).text().split(" ")[4].split("\n")));
      console.log(parallelRates[0], wu0[4]);
      let cbnRates = [];
      $(".entry-content table tbody tr").last().prev().filter(function() {
        let data = $(this);
        let recentData = data.contents().map(function(i, el) {
          return $(this).html();
        }).get();
        let x = JSON.stringify(recentData);
        let y = JSON.parse(x);
        cbnRates.push(y);
      });

      if (!parallelRates[0] || parallelRates[0] === undefined) {
        console.log("calling self again to get data");
        scrape();
        return;
      }
      const nse = {
          parallel: {
            usd: parallelRates[0].usd,
            gbp: parallelRates[0].gbp,
            eur: parallelRates[0].eur
          },
          wu: {
            usd: wu0[4],
            gbp: wu0[5],
            eur: wu0[6]
          },
          cbn: {
            usd: $(cbnRates[0][1]).text(),
            gbp: $(cbnRates[0][2]).text(),
            eur: $(cbnRates[0][3]).text()
          }
        }
        console.log(nse);
        // try {
        //   request.put({ url: API_BASE, body: nse, json: true }, function(error, response, body) {
        //     if (error) {
        //       return console.error('upload failed:', error);
        //     }
        //     console.log('Upload successful!  Server responded with:', body);
        //   });
        // } catch (e) {
        //   console.log("error occured sending json", e);
        // }
    }
  });
}

async function getRates() {
  try {
    const refreshScrape = await scrape();
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.log(error, "error retreiving data");
  }
}

export default { scrape, getRates }
