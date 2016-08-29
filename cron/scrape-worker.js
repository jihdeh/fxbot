import moment from "moment";
import schedule from "./rescrape-schedule";
import scraper from "../app/config/web-scraper";

console.log("Updating once every", moment.duration(schedule.update).humanize());
scraper.scrape();
setInterval(scraper.scrape, schedule.update);
