import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Session = new Schema({
  requester: String,
  aboki: String,
  
  sessionId: { type: String, index: true },
  time: { type: Date, default: Date.now }
});

export default mongoose.model("Session", Session);
