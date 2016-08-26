import request from "request";
let API_BASE = "https://api.myjson.com/bins/186hf";

function getRates() {
  let x;
  request.get({ url: API_BASE, json: true }, (err, res, body) => {
    x = body;
  });
  setTimeout(() => {
    return x;
  }, 5000)
  // return x;
};

module.exports = getRates;
