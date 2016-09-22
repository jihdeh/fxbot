import cheerio from "cheerio";
import {get} from "lodash";

export default function fetchCbnRates(html) {
//if there no other results
//either the first or the second function must return results that are not empty strings
let $ = cheerio.load(html);
function getFirstResult() {
  let cbnRates = [];
  $(".entry-content table tbody tr").last().filter(function() {
    let data = $(this);
    let recentData = data.contents().map(function(i, el) {
      return $(this).html();
    }).get();
    let x = JSON.stringify(recentData);
    let y = JSON.parse(x);
    cbnRates.push(y);
  });
  return cbnRates;
}

function getSiblings() {
  let cbnRates = [];
  $(".entry-content table tbody tr").last().siblings().filter(function() {
    let data = $(this);
    let recentData = data.contents().map(function(i, el) {
      return $(this).html();
    }).get();
    let x = JSON.stringify(recentData);
    let y = JSON.parse(x);
    cbnRates.push(y);
  });
  return cbnRates;
}
 const firstFn = getFirstResult();
 const secondFn = getSiblings();
 const passRatesDown = ($(get(secondFn, "[0][1]")).text() !== "") ? secondFn[1] : firstFn[0];
 return passRatesDown;
}
