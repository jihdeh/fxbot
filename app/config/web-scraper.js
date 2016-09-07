import request from "request";
import cheerio from "cheerio";
import axios from "axios";
import {get} from "lodash";
import officerCbn from "./cbn";

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
          usd: $(get(recentData, "[1]")).text(),
          gbp: $(get(recentData, "[2]")).text(),
          eur: $(get(recentData, "[3]")).text()
        });
      });
      let storeWURates = [];
      $(".entry-content table").last().prev().prev().prev().prev().filter(function() {
        let data = $(this);
        let recentData = data.contents().map(function(i, el) {
          return $(this).html();
        }).get();
        let x = JSON.stringify(recentData);
        let y = JSON.parse(x);
        storeWURates.push(y);
      });
      //western union rates is currently unstable and sometimes breaks.
      const wu0 = JSON.parse(JSON.stringify($(get(storeWURates, "[0][0]")).text().split("\n")));
      const cbnRates = officerCbn(html);

      if (!parallelRates[0] || parallelRates[0] === undefined) {
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
          usd: wu0[9],
          gbp: wu0[10],
          eur: wu0[11]
        },
        cbn: {
          usd: $(get(cbnRates, "[1]")).text(),
          gbp: $(get(cbnRates, "[2]")).text(),
          eur: $(get(cbnRates, "[3]")).text()
        }
      }
      console.log(nse);
      try {
        if (nse) {
          request.put({ url: API_BASE, body: nse, json: true }, function(error, response, body) {
            if (error) {
              return console.error('upload failed:', error);
            }
            console.log('Upload successful!  Server responded with:', body);
          });
        }
      } catch (e) {
        console.log("error occured sending json", e);
      }
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
