import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Session = new Schema({
  bids: [Object.assign({}, {
    user1: String,
    user2: String,
    index: true
    })],
  time: { type: Date, default: Date.now }
});

export default mongoose.model("Session", Session);
