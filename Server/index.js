import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User.js";
import authRoutes from "./routes/auth.js";
import cookieparser from "cookie-parser";
import cors from "cors";
// import blogRouter from "./routes/Blog.js"
import blog_router from "./routes/Blog.js";
// import blog from "./Models/blog.js"
import blog from "./Controllers/Mblog.js";
import Tag from "./Models/Tags.js";
import { faker } from "@faker-js/faker";
import Fuse from "fuse.js";
import { followFunc, sendMail, unfollowFunc } from "./Controllers/auth.js";
import { createError } from "./error.js";
import { verifyToken } from "./Verify.js";
import User from "./Models/User.js";
import interaction_router from "./routes/Interaction.routes.js";

// import algoliasearch from 'algoliasearch';
// UKAHGWLA0Z
// 85eda515b05d95ee73b78ccb67aad0d0

const app = express();
app.use(cors());
dotenv.config();

//Cors setup  :
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://flash-post.vercel.app/",
      "https://flashpost.netlify.app/",
    ],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const connect = () => {
  console.log("waiting for the Db");
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieparser());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Server Running Bro!");
  res.status(200).send("Server Running : Flashpost");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blog_router);
app.use("/api/interaction", interaction_router);
// test route for deployment send json data
app.get("/api/test", (req, res) => {
  res.json({ message: "success" });
});

//search db for blogs with title, tags, desc : without any filter or pagination
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query;
    const options = {
      keys: ["title", "tags", "desc", "content", "Author"],
      includeScore: true,
      threshold: 0.4,
    };
    const blogs = await blog.find();
    const fuse = new Fuse(blogs, options);
    const result = fuse.search(query);
    const matchedBlogs = result.map(({ item }) => item);
    res.json(matchedBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" || "unAuth" });
  }
});

app.get("/api/tags", async (req, res) => {
  try {
    const blogs = await blog.find();
    const tags = blogs.map((blog) => blog.tags);
    const alltags = tags.flat();
    // Remove null tags and tags that contain only spaces
    const cleanedTags = alltags.filter((tag) => tag && tag.trim() !== "");
    // Convert tags to lowercase and trim whitespace
    const formattedTags = cleanedTags.map((tag) => tag.trim().toLowerCase());
    const tagcount = {};
    formattedTags.forEach((tag) => {
      tagcount[tag] = (tagcount[tag] || 0) + 1;
    });
    // Get the top 20 tags
    const uniqueTags = Object.keys(tagcount);
    const sortedTags = uniqueTags.sort((a, b) => tagcount[b] - tagcount[a]);
    const topTags = sortedTags.slice(0, 20);
    // Loop through each unique tag and save it to the database
    for (let i = 0; i < topTags.length; i++) {
      const tag = topTags[i];
      const count = tagcount[tag];
      const tagModel = new Tag({ name: tag, count });
      await tagModel.save();
    }
    res.json(tagcount);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



app.get("/api/TopTags", async (req, res) => {
  try {
    const tags = await Tag.find().sort({ count: -1 }).lean(); // return plain js object instead of mongoose object :

    // Set to store unique transformed tags
    const uniqueTags = new Set();

    // Array to store unique tag objects
    const transformedTags = [];

    // Iterate over each tag
    tags.forEach((tag) => {
      // Transform the tag name (trim whitespace, convert to lowercase)
      const transformedTag = tag.name.trim().toLowerCase();

      // Skip if the transformed tag already exists in the Set
      if (uniqueTags.has(transformedTag)) {
        return;
      }

      // Add the transformed tag to the Set and the array
      uniqueTags.add(transformedTag);
      transformedTags.push({ name: transformedTag, count: tag.count });
    });

    res.json(transformedTags.slice(0, 12));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    succuess: false,
    message,
    status,
  });
});

//follow user function :
app.post("/api/follow", followFunc);

app.post("/api/unfollow", unfollowFunc);

// mail

app.post("/api/sendmail", sendMail);

// password rest :

//get all the info about user

app.listen(3000, () => {
  console.log("starting server");
  connect();
  console.log("Server running on port 3000");
});
