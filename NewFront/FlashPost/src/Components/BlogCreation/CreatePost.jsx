import React, { useState, useRef, useEffect, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ImageKit from 'imagekit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuillEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` }
  };

  // Initialize Quill editor on component mount
  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          ['link'],
          [{ 'align': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['clean']
        ]
      },
      placeholder: 'Write something...',
      theme: 'snow'
    });

    quillRef.current.on('text-change', () => {
      // Your text change logic here
      const delta = quillRef.current.getContents();
      const html = editorRef.current.firstChild.innerHTML;
      console.log(html);
    });
  }, []);

  // Event handlers
  const handleTitleInput = useCallback(event => {
    setTitle(event.target.value);
  }, []);

  const handleDescriptionInput = useCallback(event => {
    setDescription(event.target.value);
  }, []);

  const handleTagsInput = useCallback(event => {
    const tagsString = event.target.value;
    const tagsArray = tagsString.split(",").map(tag => tag.trim());
    setTags(tagsArray);
  }, []);

  // Blog upload function
  const handleSubmit = async event => {
    event.preventDefault();
    const delta = quillRef.current.getContents();
    const html = editorRef.current.firstChild.innerHTML;

    if (title === "" || description === "" || tags === "" || coverUrl === "" || html === "") {
      toast.error("Please fill all the fields");
      return;
    }

    // Check if the user is logged in or not
    if (!currentUser) {
      toast.error("Please login to upload a blog");
      return;
    }

    // Check tags: For not allowing duplicate tags and remove spaces in start and end
    const tagsArray = tags.map(tag => tag.trim());
    const uniqueTags = [...new Set(tagsArray)];
    setTags(uniqueTags);

    try {
      toast.info("Uploading blog...");

      const res = await axios.post(
        'https://back-e0rl.onrender.com/api/blogs/uploadBlog',
        {
          title,
          imgUrl: coverUrl,
          desc: description,
          tags,
          Author: currentUser.name,
          content: JSON.stringify(delta)
        },
        config
      );

      toast.success("Blog uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // Image upload function to imagekit.io
  const imagekit = new ImageKit({
    publicKey: "public_URvjzrf8cUDwCO0A6NK3VOYWg1U=",
    urlEndpoint: "https://ik.imagekit.io/cwq19b8fi",
    privateKey: "private_gR6kfpKknhbtLmBe7OXtwKJ19h0=",
    authenticationEndpoint: "localhost:5173",
  });

  const handleImageUpload = async (file) => {
    try {
      const result = await imagekit.upload({
        file: file,
        fileName: file.name,
        folder: '/Covers', // Specify the folder in ImageKit.io where you want to upload the image
        tags: ['BlogCover', 'FlashPost', 'Pavan Patchikarla'], // Optional: add tags to the image
      });
      setCoverUrl(result.url);
      console.log('Image uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="p-8 space-y-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Create a Blog</h1>
      <input
        value={title}
        onChange={handleTitleInput}
        className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md"
        type="text"
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={handleDescriptionInput}
        className="w-full h-32 px-4 py-2 text-sm bg-gray-100 rounded-md"
        placeholder="Description"
      />
      <input
        type="file"
        onChange={(event) => handleImageUpload(event.target.files[0])}
      />
      <input
        value={tags}
        onChange={handleTagsInput}
        className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md"
        type="text"
        placeholder="Tags (comma separated)"
      />
      <div ref={editorRef} className="w-full h-96 bg-gray-100 rounded-md" />
     <div className='flex gap-2 bg-primary'>
     <button
        onClick={handleSubmit}
        className="px-4 py-2 w-full font-semibold text-secondary bg-primary hover:bg-secondary hover:text-primary "
      >
        Submit Blog
      </button>
      <button className="px-4 py-2 w-full font-semibold text-primary bg-secondary hover:bg-primary hover:text-secondary ">
        Save as Draft
      </button>
     </div>
      {coverUrl && <img src={coverUrl} alt="Blog Cover" className=" h-40 object-cover rounded-md" />}
      <ToastContainer />
    </div>
  );
}

export default QuillEditor;
