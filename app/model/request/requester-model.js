import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Request = new Schema({
  requester: { type: Number, index: true },
  requestID: { type: String, index: true },
  time: { type: Date, default: Date.now },
  isRequesting: {type: Boolean, index: true, default: false}
});

export default mongoose.model("Request", Request);
