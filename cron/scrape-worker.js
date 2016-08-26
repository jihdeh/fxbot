import moment from "moment";
import schedule from "./rescrape-schedule";
import scraper from "../app/config/web-scraper";
import callMainMessger from "../app/config/text-responder";
import fs from  "fs";

console.log("Updating once every", moment.duration(schedule.update).humanize());
scraper.scrape();
// callMainMessger();

const ratez  = JSON.parse(fs.readFileSync("rates.json", "utf8"));
console.log(ratez, "-----------------obj");
setInterval(scraper.scrape, schedule.update);
