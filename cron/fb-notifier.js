import cron from "node-cron";
const task = cron.schedule('* * * * *', function() {
  console.log('running a task 1 minute');
  require("../worker/facebook/");
}, false);
task.start();
