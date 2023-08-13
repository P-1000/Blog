import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: [String],
      default: [],
    },
    Author:{
      type:String,
      required:true,
    },
    Content:{
      type:String,
      requried:true,
      default:"FlashPost : Where Technology Touches Words: Flashpost Chronicles"
    },
    likes:{
      type:Number,
      default:0,
    },
  },
  { timestamps: true } 
);

export default mongoose.model("Blog", BlogSchema);   