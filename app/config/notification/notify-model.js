import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Notify = new Schema({
  recipient: { type: String, index: true }
});

export default mongoose.model("Notify", Notify);
