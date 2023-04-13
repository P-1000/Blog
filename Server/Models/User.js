import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true , unique: true},
    password: {type: String, required: true},
    Followers: {
        type: [String],
    },
    Following: {
        type:[String],
    },
    Bookmarks: {
        type: [String],
    },
    ProfilePic: {
        type: String,
    },
    Bio: {
        type: String,
    },
    Website: {
        type: String,
    },
    LinkedIn: {
        type: String,
    },
    Github: {
        type: String,
    },
    Location: {
        type: String,
    },
    TechStack: {
        type: [String],
    },

},{timestamps:true});

export default mongoose.model("User", userSchema);
