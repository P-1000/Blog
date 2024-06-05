import React from "react";
import { CiBookmark, CiBookmarkRemove } from "react-icons/ci";
import axios from "axios";

//todo : add separate collection for bookmarks
//todo : toast notification for bookmarking
const BookmarkButton = ({ blogId, user, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const isBookmarked = user && user.Bookmarks.includes(blogId);
  console.log(isBookmarked);

  const handleBookmarkClick = async () => {
    try {
      if (isBookmarked) {
        await axios.put(
          `/api/users/${user._id}/removeBookmark`,
          { blogId },
          config
        );
      } else {
        await axios.put(
          `/api/users/${user._id}/addBookmark`,
          { blogId },
          config
        );
      }
    } catch (error) {
      console.error("Error bookmarking blog:", error);
    }
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full px-3 py-1 cursor-pointer hover:bg-gray-200 transition duration-300`}
      onClick={handleBookmarkClick}
    >
      {isBookmarked ? (
        <CiBookmarkRemove className="text-gray-500 text-xl" />
      ) : (
        <CiBookmark className="text-gray-500 text-xl" />
      )}
    </div>
  );
};

export default BookmarkButton;
