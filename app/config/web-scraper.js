import request from "request";
import cheerio from "cheerio";
import axios from "axios";

let API_BASE = "https://api.myjson.com/bins/186hf";
let url = "http://abokifx.com";

function scrape() {
  request(url, function(error, response, html) {
    if (!error) {
      let $ = cheerio.load(html);
      $(".entry-content table tbody tr").first().next().next().filter(function() {
        let data = $(this);
        let recentData = data.contents().map(function(i, el) {
          return $(this).html();
        }).get();
        let USD = $(recentData[1]).text();
        let GBP = $(recentData[2]).text();
        let EUR = $(recentData[3]).text();
        const result = {
          "usd": USD,
          "gbp": GBP,
          "eur": EUR
        };
        try {
          request.put({ url: API_BASE, body: result, json: true }, function(error, response, body) {
            if (error) {
              return console.error('upload failed:', error);
            }
            console.log('Upload successful!  Server responded with:', body);
          });
        } catch (e) {
          console.log("error occured sending json", e);
        }
      });
    }
  });
}

function westernUnionScrape() {
  request(url, function(error, response, html) {
    if (!error) {

      let $ = cheerio.load(html);
      $(".entry-content table tbody tr").next().next().filter(function() {
        let data = $(this);
        let recentData = data.contents().map(function(i, el) {
          return $(this).html();
        }).get();
        // console.log(recentData[1])
          // let USD = $(recentData[9]).text();
          // let GBP = $(recentData[10]).text();
          // let EUR = $(recentData[11]).text();

        // const result = {
        //   "usd": USD,
        //   "gbp": GBP,
        //   "eur": EUR
        // };
      });
    }
  });
}

westernUnionScrape()

async function getRates() {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.log(error, "error retreiving data");
  }
}

export default { scrape, westernUnionScrape, getRates }
