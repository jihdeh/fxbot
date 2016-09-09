import cron from "node-cron";
const task = cron.schedule('* 2 * * *', function() {
  console.log('running a task 2 minute');
  require("../worker/facebook/");
}, false);
task.start();
