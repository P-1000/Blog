import { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
      headers: { Authorization: `Bearer ${tok}` }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const blog_content = {
        title: title,
        desc: content,
        //send imgUrl according to title
        imgUrl: `https://source.unsplash.com/featured/${title}`,
        videoUrl: "https://www.youtube.com/watch?v=1w7OgIMMRc4",
        tags: ["blogging", "first post"],
      }
     const response = await axios.post('http://localhost:3000/api/blogs/uploadBlog', blog_content ,config);
    //  console.log(title, content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-4">Create Blog Post</h1>
      <form className="w-3/4 max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
            Content
          </label>
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
