import moment from "moment";
import schedule from "./rescrape-schedule";
import update from "../app/config/web-scraper";

console.log("Updating once every", moment.duration(schedule.update).humanize());

update();
setInterval(update, schedule.update);
