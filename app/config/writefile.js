import fs from "fs";

export default function(result) {
  const writableStream = fs.createWriteStream("rates.json");
  writableStream.write(JSON.stringify(result, null, 2), "UTF8");
  writableStream.end();
  writableStream.on('finish', async function() {
    console.log("Write completed to rates file.", result);
  });
  writableStream.on('error', function(err) {
    console.log("error writing main json", err.stack);
  });
}
