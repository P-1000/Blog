import axios from "axios";
import { toast } from "react-hot-toast";
// import { API_BASE_URL } from "../utils/globals";

const API_BASE_URL = "http://localhost:3000";

const BlogService = {
  postNewBlog: async (formData, config) => {
    const newFormData = {
        title: formData.title,
        content: formData.Content,
        coverimage: formData.imgUrl,
        tags: formData.tags,
        description: formData.desc
    };
    try {
        const promise = axios.post(`${API_BASE_URL}/blog/blog`, newFormData, config);
        toast.promise(promise, {
            loading: "Posting blog...",
            success: "Blog created successfully!",
            error: (error) => `Blog Upload failed: ${error}`
        });
        const response = await promise;
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
  },

};

export const { postNewBlog } = BlogService;

export default BlogService;
