import React, { useState, useRef, useEffect } from 'react';
 import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ImageKit from 'imagekit';
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'


function QuillEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
 const editorRef = useRef(null);
 const quillRef = useRef(null);
 const { currentUser } = useSelector(state => state.user);
 const [postImage , setPostImage] = useState({Cover : ""}) 
 const [imgu , setimgU] = useState('')
 const token = localStorage.getItem('jwt');
 const tok = JSON.parse(token);
 const config = {
     headers: { Authorization: `Bearer ${tok}` }
 }
  useEffect(() => {
    if (editorRef.current) {
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
        const delta = quillRef.current.getContents();
        const html = editorRef.current.firstChild.innerHTML;
        console.log(html);
      });
    }
  }, []);




  function handleTitleInput(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionInput(event) {
    setDescription(event.target.value);
  }

  function handleTagsInput(event) {
    // setTags(event.target.value);
    const tagsString = event.target.value;
    const tagsArray = tagsString.split(",");
    setTags(tagsArray)
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const delta = quillRef.current.getContents();
    const html = editorRef.current.firstChild.innerHTML;
    if(title === "" || description === "" || tags === "" || coverUrl === "" || html === ""){
      alert("Please fill all the fields");
      return;
    }
    //check if the user is logged in or not
    if(!currentUser){
      alert("Please login to continue");
      return;
    }
    // check tags : for not allowing duplicate tags and remove spaces in start and end
    const tagsArray = tags.map((tag)=>{
      return tag.trim();
    })

    const uniqueTags = [...new Set(tagsArray)];
    setTags(uniqueTags);

    try {
      const res = await axios.post('ttps://back-e0rl.onrender.com/api/blogs/uploadBlog',  {
        title,
        imgUrl: coverUrl,
        desc:description,
        tags,
        Author:currentUser.name,
       content: JSON.stringify(delta)
      } , config);
   //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  //headers for imagekit.io
const imagekit = new ImageKit({
  publicKey:"public_URvjzrf8cUDwCO0A6NK3VOYWg1U=",
  urlEndpoint:"https://ik.imagekit.io/cwq19b8fi",
  privateKey:"private_gR6kfpKknhbtLmBe7OXtwKJ19h0=",
  authenticationEndpoint:"localhost:5173",
});




  // Image  upload function to imagekit.io
const handleImageUpload = async (file) => {
  try {
    const result = await imagekit.upload({
      file: file,
      fileName: file.name,
      folder: '/Covers', // Specify the folder in ImageKit.io where you want to upload the image
      tags: ['BlogCover', 'FlashPost' , 'Pavan Patchikarla'], // Optional: add tags to the image
      
    });
    setCoverUrl(result.url);
    console.log(result.url)
    console.log('Image uploaded successfully:', result);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


  return (
    <>
    <div className="flex flex-col w-8/12 ml-36 ">
      <label className="text-gray-700 font-bold mb-2" htmlFor="title">Title:</label>
      <input value={title} onChange={handleTitleInput} id="title" type="text" className="bg-gray-200 rounded px-3 py-2 mb-4" />

      <label className="text-gray-700 font-bold mb-2" htmlFor="image">Image:</label>
<input 
      type="file" 
      onChange={(event) => handleImageUpload(event.target.files[0])} />


      <label className="text-gray-700 font-bold mb-2" htmlFor="description">Description:</label>
      <textarea value={description} onChange={handleDescriptionInput} id="description" className="bg-gray-200 rounded px-3 py-2 mb-4"></textarea>

      <label className="text-gray-700 font-bold mb-2" htmlFor="tags">Tags:</label>
      <input value={tags} onChange={handleTagsInput} id="tags" type="text" className="bg-gray-200 rounded px-3 py-2 mb-4" />
      </div>
      <div className="flex flex-col w-8/12 absolute left-52 mt-10">
      <div className="text-gray-700 font-bold mb-2">Content:</div>
      <div ref={editorRef} className="bg-gray-200 rounded px-3 py-2 mb-4" />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </div>
 {
  postImage &&   <img src={postImage.Cover} alt='error bro' />
 }
    </>
  );
}

export default QuillEditor;


