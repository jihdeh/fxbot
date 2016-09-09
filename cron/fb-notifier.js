import cron from "node-cron";
import fbBroadcast from "../worker/facebook";

const task = cron.schedule('*/5 * * * *', function() {
  console.log('running task every 3 hours');
  fbBroadcast();
}, false);
task.start();
