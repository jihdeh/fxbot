import Twit from "twit";
import report from "./text-responder";
import shortId from "shortid";

const Tweet = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

(async function publishRates() {
  const rates = await report("rates");
  const constructTweet = rates;
  try {
    const tweetUpdate = await Tweet.post('statuses/update', { status: constructTweet });
    console.log(tweetUpdate.data.created_at);
  } catch (e) {
    console.log(e, "error occured posting tweet update");
  }
}());
