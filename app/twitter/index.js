import Twit from "twit";
import report from "./text-responder";
import shortId from "shortid";

const Tweet = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
});

export default async function publishRates() {
  const generateShortId = "#"+shortId.generate();
  const rates = await report("rates");
  const construct = rates + "\n"+generateShortId;

  Tweet.post('statuses/update', { status: construct }, function(err, data, response) {
    console.log(data.id)
  })
}

