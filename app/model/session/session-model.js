import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Session = new Schema({
  requester: {type: String, index: true},
  aboki: {type: String, index: true},
  connected: {type: Boolean, index: true},
  sessionId: { type: String, index: true },
  time: { type: Date, default: Date.now }
});

export default mongoose.model("Session", Session);
