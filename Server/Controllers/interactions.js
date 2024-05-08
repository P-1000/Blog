import Blog from "./Mblog.js";

export const LikeInteraction = async (req, res) => {
  const blogId = req.params.bid;
  const userId = req.body.userId;
  if (!blogId) return res.status(400).json({ message: "Blog ID is required" });
  console.log(blogId)
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const existingLike = await BlogLike.findOne({
      blogId: blog._id,
      userId: req.user.id,
    });

    if (existingLike)
      return res
        .status(402)
        .json({ message: "User has already liked this blog" });

    const newLike = new BlogLike({ blogId: blog._id, userId: req.user.id });
    await newLike.save();

    blog.likes += 1;
    await blog.save();
    res.status(200).json({ message: "Blog liked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
