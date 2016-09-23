import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Request = new Schema({
  requester: { type: Number, index: true },
  requestID: { type: String, index: true },
  time: { type: Date, default: Date.now }
});

export default mongoose.model("Request", Request);
