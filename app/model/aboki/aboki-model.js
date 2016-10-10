import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Aboki = new Schema({
  abokiID: { type: String, index: true },
  name: { type: String, index: true },
  locale: String,
  timezone: Number,
  gender: String,
  inSession: {type: String, index: true, default: false},
  banned: {type: Boolean, default: false}
});

export default mongoose.model("Aboki", Aboki);
