import React, { useEffect, useState } from 'react';

function Book(props) {
  const [bookmarksid, setBookmarksid] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarkids = async () => {
      try {
        const res = await fetch('https://back-e0rl.onrender.com/api/users/Naruto/bookmarks');
        const data = await res.json();
        setBookmarksid(data);
      } catch (error) {
        console.log(error);
        setError('Error fetching bookmark IDs');
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
        {bookmarks.map((bookmark) => (
          <div>{bookmark?.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Book;
