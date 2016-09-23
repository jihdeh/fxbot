import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Aboki = new Schema({
  abokiID: { type: String, index: true },
  name: { type: String, index: true },
  locale: String,
  timezone: Number,
  gender: String,
  inSession: {type: Boolean, index: true, default: false}
});

export default mongoose.model("Aboki", Aboki);
