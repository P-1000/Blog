import React,{useState} from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdCreate } from "react-icons/md";
import { PiBroadcastFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from "../../redux/formDataSlice";
import MouseOverPopover from "./Profile";
import { toast } from "react-toastify";
import instance from "../../Config/AxiosInst.js";

const UserActions = ({ authUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { title, description, tags, coverUrl, Content } = useSelector(
    (state) => state.blog
  );

  const [title1, setTitle] = useState(title);
  const [description1, setDescription] = useState(description);
  const [tags1, setTags] = useState([]);
  const [coverUrl1, setCoverUrl] = useState("");
  const [content1, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (location.pathname == "/Edit/:id") {
      handleEditSubmit();
      return;
    }
    if (Content === "" || title === "" || description === "" || tags === "" || coverUrl === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (!currentUser) {
      toast.error("Please login to upload a blog");
      return;
    }
    const tagsArray = tags.map((tag) => tag.trim());
    const uniqueTags = [...new Set(tagsArray)];
    setTags(uniqueTags);
    try {
      toast.info("Uploading blog...");
      const res = await instance.post(
        "/api/blogs/uploadBlog",
        {
          title,
          imgUrl: coverUrl,
          desc: description,
          tags,
          Author: currentUser.name,
          Content: JSON.stringify(content1),
        },
        {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}` },
        }
      );
      dispatch(resetForm());
      toast.success("Blog uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (title === "" || description === "" || tags === "" || coverUrl === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (!currentUser) {
      toast.error("Please login to upload a blog");
      return;
    }
    const tagsArray = tags.map((tag) => tag.trim());
    const uniqueTags = [...new Set(tagsArray)];
    setTags(uniqueTags);
    try {
      toast.info("Uploading blog...");
      const res = await instance.put(
        `/api/blogs/update/${localStorage.getItem("blogId")}`,
        {
          title,
          imgUrl: coverUrl,
          desc: description,
          tags,
          Author: currentUser.name,
          Content: JSON.stringify(content1),
        },
        {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}` },
        }
      );
      dispatch(resetForm());
      toast.success("Blog uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex col-span-3 justify-around w-full">
      {location.pathname === "/Write" || location.pathname.startsWith("/Edit/") ? (
        <button
          onClick={location.pathname.startsWith("/Edit/") ? handleEditSubmit : handleSubmit}
          className="w-full bg-primary rounded-full flex gap-2 px-4 py-2 text-sm font-semibold text-secondary mr-2 hover:bg-secondary hover:text-primary transition-all"
        >
          <PiBroadcastFill className="text-xl hover:animate-pulse" />
          {location.pathname.startsWith("/Edit/") ? "UpdateBlog" : "Publish"}
        </button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          whileDrag={{ scale: 0.9 }}
          onClick={() => navigate("/Write")}
          className="w-full bg-primary rounded-full lg:flex hidden gap-2 px-4 py-2 text-sm font-semibold text-secondary mr-2 hover:bg-secondary hover:text-primary transition-all"
        >
          <Link to="/Write" className="flex gap-1">
            <MdCreate className="text-xl text-gray-200" />
            Create
          </Link>
        </motion.button>
      )}
      <div className="flex justify-between gap-7">
        <button>
          <IoNotificationsOutline className="text-2xl lg:flex hidden text-gray-400 hover:text-secondary" />
        </button>
        <button>
          <MouseOverPopover name={authUser.name} className="text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default UserActions;
