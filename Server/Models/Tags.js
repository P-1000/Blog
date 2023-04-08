import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
