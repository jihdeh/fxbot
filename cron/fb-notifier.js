import cron from "node-cron";
import fbBroadcast from "../worker/facebook";

const task = cron.schedule('*/2 * * * *', function() {
  console.log('running a task 1 minute');
  fbBroadcast();
}, false);
task.start();
