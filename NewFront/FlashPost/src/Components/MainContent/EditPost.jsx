import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ImageKit from 'imagekit';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTitle, updateDescription, updateTags, updateContent, updateCoverUrl, resetForm } from '../../redux/formDataSlice';
import TextEditor from '../BlogCreation/EditorJs';
import instance from '../../Config/AxiosInst';
import Author from './Author';

function EditPost() {
  const { blogId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);
  const [imgUrl, setImgUrl] = useState('');
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` }
  };


  localStorage.setItem('blogId', JSON.stringify(blogId));
  

  const dispatch = useDispatch();


  // useEffect(() => {
  //   if (editorRef.current) {
  //     quillRef.current = new Quill(editorRef.current, {
  //       modules: {
  //         toolbar: [
  //           [{ header: [1, 2, 3, false] }],
  //           ['bold', 'italic', 'underline', 'strike'],
  //           [{ 'color': [] }, { 'background': [] }],
  //           ['link'],
  //           [{ 'align': [] }],
  //           [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //           ['clean']
  //         ]
  //       },
  //       placeholder: 'Write something...',
  //       theme: 'snow'
  //     });

  //     quillRef.current.on('text-change', () => {
  //       const delta = quillRef.current.getContents();
  //       const html = editorRef.current.firstChild.innerHTML;
  //       console.log(html);
  //     });
  //   }
  // }, []);

  const [showEditor, setShowEditor] = useState(false);

    //for editor js default component : 
    const DEFAULT_INITIAL_DATA = () => {

  
      return {"time":1691867402106,"blocks":[{"id":"G61UUQLEPX","type":"header","data":{"text":"Start Writing Your Blog....","level":2}},{"id":"QS7dZaETlq","type":"paragraph","data":{"text":"asfdasfdsadf hello there&nbsp;"}},{"id":"JQtHyPZJ9i","type":"paragraph","data":{"text":"asfasf"}},{"id":"eLqUsvEHaf","type":"paragraph","data":{"text":"asf"}},{"id":"SZaxdbn_xF","type":"paragraph","data":{"text":"asfd"}}],"version":"2.27.2"}
    };

   const [con , setCon] = useState(null);
  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get(`https://back-e0rl.onrender.com/api/blogs/blog/${blogId}`, config);
      const res = await instance.get(`/api/blogs/blog/${blogId}`, config);
      setTitle(res.data.title);
      setDescription(res.data.desc);
      setTags(res.data.tags);
      setCoverUrl(res.data.imgUrl);
      setImgUrl(res.data.imgUrl);
      const red = JSON.parse(res.data.Content);
      setCon(red);
    }
    fetchData();
  }, []);

  // Image upload function to imagekit.io
  const handleImageUpload = async (file) => {
    try {
      const imagekit = new ImageKit({
        publicKey: "public_URvjzrf8cUDwCO0A6NK3VOYWg1U=",
        urlEndpoint: "https://ik.imagekit.io/cwq19b8fi",
        privateKey: "private_gR6kfpKknhbtLmBe7OXtwKJ19h0=",
        authenticationEndpoint: "http://localhost:5173",
      });

      const ImgResult = await imagekit.upload({
        file: file,
        fileName: file.name,
        folder: '/Covers',
        tags: ['BlogCover', 'FlashPost', 'Pavan Patchikarla'],
      });
      setImgUrl(ImgResult.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  function handleTitleInput(event) {
    setTitle(event.target.value);
    dispatch(updateTitle(event.target.value));
  }

  function handleDescriptionInput(event) {
    setDescription(event.target.value);
    dispatch(updateDescription(event.target.value));
  }

  function handleTagsInput(event) {
    const tagsString = event.target.value;
    const tagsArray = tagsString.split(",");
    setTags(tagsArray);
    dispatch(updateTags(tagsArray));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const delta = quillRef.current.getContents();
    try {
      // const res = await axios.put(`https://back-e0rl.onrender.com/api/blogs/update/${blogId}`, {
      //   title,
      //   imgUrl,
      //   desc: description,
      //   tags,
      //   Author: currentUser.name,
      // }, config);
      const res = await instance.put(`/api/blogs/update/${blogId}`, {
        title,
        imgUrl,
        desc: description,
        tags,
        Author: currentUser.name,
      }, config);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(updateTags(tags));
    dispatch(updateTitle(title));
    dispatch(updateDescription(description));
    dispatch(updateCoverUrl(imgUrl));
    dispatch(updateContent(con));
  }, [tags, title, description, imgUrl, con]);

  const [editor_js_data, setEditor_js_data] = useState(con);

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
    <div className="flex flex-col space-y-4 p-4 pt-28 bg-white min-h-screen ">
      <label className="text-gray-700 font-bold" htmlFor="title">Title:</label>
      <input value={title} onChange={handleTitleInput} id="title" type="text" className="w-full bg-gray-200 rounded px-3 py-2" />

      <label className="text-gray-700 font-bold" htmlFor="image">Image:</label>
      <input
        type="file"
        onChange={(event) => handleImageUpload(event.target.files[0])}
        className="w-full bg-gray-200 rounded px-3 py-2"
      />

      <label className="text-gray-700 font-bold" htmlFor="description">Description:</label>
      <textarea
        value={description}
        onChange={handleDescriptionInput}
        id="description"
        className="w-full bg-gray-200 rounded px-3 py-2"
      />

      <label className="text-gray-700 font-bold" htmlFor="tags">Tags:</label>
      <input
        value={tags}
        onChange={handleTagsInput}
        id="tags"
        type="text"
        className="w-full bg-gray-200 rounded px-3 py-2"
      />

      {/* <div className="text-gray-700 font-bold">Content:</div> */}
      {/* <div ref={editorRef} className="w-full bg-gray-200 rounded px-3 py-2" /> */}
      {/* <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button> */}

      {!showEditor ? (
        <button
          onClick={() => setShowEditor(true)}
          className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4"
        >
          Edit Content
        </button>
      ) : (
        <TextEditor onBack={() => setShowEditor(false)} data={con} setdata={setCon} />
      )}
    </div>
  );
}

export default EditPost;
