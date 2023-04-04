import React, { useState, useRef, useEffect } from 'react';
 import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function QuillEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

  // image file to base 64 -
  function convertToBase64(file){
    return new Promise((resovle,reject)=>{
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = ()=>{
        resovle(fileReader.result)
      };
      fileReader.onerror = (error) =>{
          reject(error)
      }
    })
}

// base64 to image : 


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

  async function handleImageUpload(event) {
   const file = event.target.files[0]
   const base64 = await convertToBase64(file)
   setPostImage({...postImage , Cover : base64})
    setimgU(base64)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const delta = quillRef.current.getContents();
    const html = editorRef.current.firstChild.innerHTML;

    try {
      const res = await axios.post('http://localhost:3000/api/blogs/uploadBlog',  {
        title,
        imgUrl: imgu,
        desc:description,
        tags,
        Author:currentUser.name,
       // content: JSON.stringify(delta)
      } , config);
   //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className="flex flex-col w-8/12 ml-36 ">
      <label className="text-gray-700 font-bold mb-2" htmlFor="title">Title:</label>
      <input value={title} onChange={handleTitleInput} id="title" type="text" className="bg-gray-200 rounded px-3 py-2 mb-4" />

      <label className="text-gray-700 font-bold mb-2" htmlFor="image">Image:</label>
      <input 
        id="image" 
        type="file" 
        name='Cover'
        accept='.jpeg,.png, .jpg'
        className="bg-gray-200 rounded px-3 py-2 mb-4" 
        onChange={(event)=>handleImageUpload(event)}
      />

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


