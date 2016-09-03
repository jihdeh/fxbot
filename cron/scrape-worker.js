import moment from "moment";
import schedule from "./rescrape-schedule";
import scraper from "../app/config/web-scraper";


console.log("Updating Facebook once every", moment.duration(schedule.update).humanize());
setInterval(scraper.scrape, schedule.update);
