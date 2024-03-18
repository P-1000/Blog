import React from "react";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";

const ToolBar = () => {
  return (
    <div>
      <div className="">
        <div className="flex items-center bg-white shadow-lg border-gray-400/30 border rounded-full w-72 px-5 py-2 divide-x-2">
          <button className="p-2 flex justify-around transition duration-300">
            <SlLike className="w-6 h-6 hover:bg-gray-100 rounded-full " />
            <h2>38</h2>
          </button>
          <button className="p-2 transition duration-300">
            <FaRegCommentDots className="w-6 h-6 hover:bg-gray-100 rounded-full" />
          </button>
          <button className="p-2 flex transition duration-300">
            <CiBookmark className="w-6 h-6 hover:bg-gray-100 rounded-full" />
            <h2>22</h2>
          </button>
          <button className="p-2 transition duration-300">
            <AiOutlineShareAlt className="w-6 h-6 hover:bg-gray-100 rounded-full" />
          </button>
          <button className="p-2 transition duration-300">
            <MdMoreVert className="w-6 h-6 hover:bg-gray-100 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
