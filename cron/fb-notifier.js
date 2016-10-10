import cron from "node-cron";
import fbBroadcast from "../worker/facebook";

const task = cron.schedule('0 0 */4 * * *', function() {
  console.log('running task every 4 hours');
  fbBroadcast();
}, false);
task.start();
