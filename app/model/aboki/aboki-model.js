import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Aboki = new Schema({
  name: { type: String, index: true },
  inSession: {type: Boolean, index: true}
});

export default mongoose.model("Aboki", Aboki);
