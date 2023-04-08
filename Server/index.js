import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/User.js"
import authRoutes from "./routes/auth.js"
import cookieparser from "cookie-parser"
import cors from 'cors';
import blogRouter from "./routes/blog.js"
import blog_router from "./routes/blog.js"
import blog from "./Models/blog.js"
import Tag from "./Models/Tags.js"
import { faker } from '@faker-js/faker';
import Fuse from 'fuse.js';


// import algoliasearch from 'algoliasearch';
// UKAHGWLA0Z
// 85eda515b05d95ee73b78ccb67aad0d0

const app = express()
app.use(cors());
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173'
  }));

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

const connect = () =>{
    console.log("waiting for the Db")
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Database connected")
    }).catch(err => {throw err})
}



app.use(cookieparser())
app.use(express.json())

app.get("/", (req, res) => {
    console.log("Server Running Bro!")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/blogs", blog_router)



//search db for blogs with title, tags, desc : without any filter or pagination 
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query;
    const options = {
      keys: ["title", "tags", "desc" , "content" , "Author"],
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

//search db for blogs with title, tags, desc : with filter  and pagination
app.get("/api/search/filter", async (req, res) => {
  try {
    const query = req.query.query;
    const options = {
      keys: ["title", "tags", "desc" , "content" , "Author"],
      includeScore: true,
      threshold: 0.4,
    };
    const blogs = await blog.find();
    const fuse = new Fuse(blogs, options);
    const result = fuse.search(query);
    const matchedBlogs = result.map(({ item }) => item);
    const filter = req.query.filter;
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < matchedBlogs.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = matchedBlogs.slice(startIndex, endIndex);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" || "unAuth" });
  }
});

//using faker to generate fake data for testing
app.get("/api/faker", async (req, res) => {
    
    try {
        for (let i = 0; i < 20; i++) {
            const blogs= await new blog({
                title: faker.lorem.words(5),
                desc: faker.lorem.words(10),
                tags:  [faker.lorem.word(1) ,  faker.lorem.word(1) ,  faker.lorem.words(1)],
                imgUrl: faker.image.imageUrl(),
                Author: faker.name.firstName(),
                userId: "60e1f1b0b0b5a41b3c8c1b1a",
            });
         const fakeblog =await blogs.save();
        }
        res.json({ message: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"  });
    }
});


// count all the tags in the db
app.get("/api/tags", async (req, res) => {
  try {
    const blogs = await blog.find();
    const tags = blogs.map((blog) => blog.tags);
    const alltags = tags.flat();
    const tagcount = {};
    alltags.forEach((tag) => {
      tagcount[tag] = (tagcount[tag] || 0) + 1;
    });

    // Loop through each unique tag and save it to the database
    const uniqueTags = Object.keys(tagcount);
    for (let i = 0; i < uniqueTags.length; i++) {
      const tag = uniqueTags[i];
      if (tag) { // check if tag is not empty
        const tagModel = new Tag({ name: tag, count: tagcount[tag] });
        await tagModel.save();
      }
    }

    res.json(tagcount);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//get tags from db:
app.get('/api/TopTags' , async(req , res)=>{
  try {
    const result = await Tag.find().sort({ count: -1 }).limit(8);
    //response with result
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})




app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        succuess:false,
        message,
        status,
    })
})

app.get("/api/deletefakerblogs", async (req, res) => {
  try {
      const deletedBlogs = await blog.deleteMany({ userId: "60e1f1b0b0b5a41b3c8c1b1a" });
      res.json({ message: `Deleted ${deletedBlogs.deletedCount} blogs` });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});


app.listen(3000 , ()=>{
    console.log("Server running on port 3000")
    connect()
})


//K1x7Ne0KAIfLBzCa

// mongodb+srv://earnvpn:<password>@cluster0.7xjnfdn.mongodb.net/?retryWrites=true&w=majority