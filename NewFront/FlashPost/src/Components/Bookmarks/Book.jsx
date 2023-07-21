import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Book(props) {
  const [bookmarksid, setBookmarksid] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const localuser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(localuser.name);


  async function fetchLocalUser(){ 
    setUser(localuser.name)
    if(user === null){
      fetchLocalUser()
      if(user === null){
      return window.location.replace('/Home')
    }
  }
    if(user === undefined){
      return window.location.replace('/Home')
    }

    return localuser.name ? localuser.name : null
  }

  


  useEffect(() => {
    const fetchBookmarkids = async () => {
      fetchLocalUser()
      try {
        const res = await fetch(`https://back-e0rl.onrender.com/api/users/${user}/bookmarks`);
        const data = await res.json();
        setBookmarksid(data);
        setLoading(false);
       console.table(data)
      } catch (error) {
        console.log(error);
        setError('Error fetching bookmark IDs');
        window.location.replace('/')
      }
    };

    fetchBookmarkids();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async (id) => {
      try {
        const res = await fetch(`https://back-e0rl.onrender.com/api/blogs/blog/${id}`);
        const data = await res.json();
        setBookmarks((prevBookmarks) => [...prevBookmarks, data]);
      } catch (error) {
        console.log(error);
        setError('Error fetching blog data');
      }
    };

    const fetchAllBookmarks = async () => {
      try {
        await Promise.all(bookmarksid.map((id) => fetchBookmarks(id)));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Error fetching bookmarks');
      }
    };

    if (bookmarksid.length > 0) {
      fetchAllBookmarks();
    } else {
      setLoading(false);
    }
  }, [bookmarksid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <div>
      <div>
        {bookmarks.map((bookmark) => (
          <div>
          {bookmark?.title}
          <div>
          {bookmark?.desc}
          </div>
          <img src={bookmark?.imgUrl} alt="blog" />
          </div>
        ))}
      </div>
    </div>
    <ToastContainer/>
    </div>
  );
}

export default Book;
