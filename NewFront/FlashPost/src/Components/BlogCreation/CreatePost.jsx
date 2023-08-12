import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ImageKit from 'imagekit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextEditor from './EditorJs';
import { updateTitle, updateDescription, updateTags, updateContent, updateCoverUrl, resetForm } from '../../redux/formDataSlice';
import YourComponent from './Spam';

function QuillEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` }
  };

  const handleTitleInput = useCallback(event => {
    setTitle(event.target.value);
    dispatch(updateTitle(event.target.value));
  }, []);

  const handleDescriptionInput = useCallback(event => {
    setDescription(event.target.value);
    dispatch(updateDescription(event.target.value));
  }, []);

  const handleTagsInput = useCallback(event => {
    const tagsString = event.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim());
    setTags(tagsArray);
    dispatch(updateTags(tagsArray));
  }, []);

  //for editor js default component : 
  const DEFAULT_INITIAL_DATA = () => {

  
    return {
      time: new Date().getTime(),
      blocks: [
        {
          type: 'header',
          data: {
            text: 'Start Writing Your Blog....',
            level: 2,
          },
        },
      ],
    };
  };

  const [editor_js_data, setEditor_js_data] = useState(DEFAULT_INITIAL_DATA)

  // const handleSubmit = async event => {
  //   event.preventDefault();

  //   if (title === '' || description === '' || tags === '' || coverUrl === '') {
  //     toast.error('Please fill all the fields');
  //     return;
  //   }

  //   if (!currentUser) {
  //     toast.error('Please login to upload a blog');
  //     return;
  //   }

  //   const tagsArray = tags.map(tag => tag.trim());
  //   const uniqueTags = [...new Set(tagsArray)];
  //   setTags(uniqueTags);

  //   try {
  //     toast.info('Uploading blog...');

  //     const res = await axios.post(
  //       'https://back-e0rl.onrender.com/api/blogs/uploadBlog',
  //       {
  //         title,
  //         imgUrl: coverUrl,
  //         desc: description,
  //         tags,
  //         Author: currentUser.name,
  //       },
  //       config
  //     );

  //     toast.success('Blog uploaded successfully');
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //     console.log(error);
  //   }
  // };

  const imagekit = new ImageKit({
    publicKey: 'public_URvjzrf8cUDwCO0A6NK3VOYWg1U=',
    urlEndpoint: 'https://ik.imagekit.io/cwq19b8fi',
    privateKey: 'private_gR6kfpKknhbtLmBe7OXtwKJ19h0=',
    authenticationEndpoint: 'http://localhost:5173/auth',
  });

  const handleImageUpload = async file => {
    try {
      const result = await imagekit.upload({
        file: file,
        fileName: file.name,
        folder: '/Covers',
        tags: ['BlogCover', 'FlashPost', 'Pavan Patchikarla'],
      });
      setCoverUrl(result.url);
      dispatch(updateCoverUrl(result.url));
      console.log('Image uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };



    // Function to handle moving to the TextEditor step
    const handleNext = () => {
      if (title === '' || description === '' || tags === '' || coverUrl === '') {
        toast.error('Please fill all the fields');
        return;
      }
  
      if (!currentUser) {
        toast.error('Please login to upload a blog');
        return;
      }
  
      setShowEditor(true); // Show the TextEditor component
    };
  
    // Function to handle going back to the initial form step
    const handleBack = () => {
      setShowEditor(false); // Hide the TextEditor component
    };




  return (
    <>
      {!showEditor ? (
        <div className="p-8 space-y-4 bg-white rounded-lg shadow-md mt-16 min-h-screen focus:outline-none outline-none border-none">
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
            onChange={event => handleImageUpload(event.target.files[0])}
          />
          <input
            value={tags}
            onChange={handleTagsInput}
            className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md"
            type="text"
            placeholder="Tags (comma separated)"
          />
          <button
            onClick={handleNext}
            className="border border-red-500 px-10 py-1 justify-center float-right mx-10 my-4 hover:bg-secondary transition-all"
          >
            <center>Next</center>
          </button>
          {coverUrl && <img src={coverUrl} alt="Blog Cover" className="h-40 object-cover rounded-md" />}
          <ToastContainer />
        </div>
      ) : (
        <TextEditor onBack={handleBack}  data={editor_js_data} setdata={setEditor_js_data}
        /> //Show the TextEditor component
      )}
    </>
  );
}

export default QuillEditor;
