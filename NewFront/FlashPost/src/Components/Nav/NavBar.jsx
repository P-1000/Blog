import React from "react"; //todo : integrate the modularity of the code
import { CiSearch } from "react-icons/ci";
import { MdCreate } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "../../redux/userSlice";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MouseOverPopover from "./Profile.jsx";
import { PiBroadcastFill } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetForm } from "../../redux/formDataSlice";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import instance from "../../Config/AxiosInst.js";
import Author from "../MainContent/Author.jsx";
import { AuthContext } from "../../context/userContext.jsx";


function NavBar() {
  const { authUser, isLoading ,  setAuthUser, } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const ibg = localStorage.getItem("blogId");
  const blogId = JSON.parse(ibg);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` },
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      //  const res = await axios.get('https://back-e0rl.onrender.com/api/auth/read', config)
      const res = await instance.get("/api/auth/read", config);
      setUser(res.data);
      setAuthUser(res.data);
      dispatch(loginSuccess(res.data));
    }
    fetchData();
  }, []);

  const usr = localStorage.setItem("user", JSON.stringify(user));

  const [search, setSearch] = useState("");

  async function handleChange(event) {
    const search = event.target.value;
    setSearch(search);
    navigate(`/search/${search}`);
  }

  const { title, description, tags, coverUrl, Content } = useSelector(
    (state) => state.blog
  );

  // blog submission :
  const [title1, setTitle] = useState(title);
  const [description1, setDescription] = useState(description);
  const [tags1, setTags] = useState([]);
  const [coverUrl1, setCoverUrl] = useState("");
  const [content1, setContent] = useState("");

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setTags(tags);
    setCoverUrl(coverUrl);
    setContent(Content);
  }, [title, description, tags, coverUrl, Content]);

  //handle edit post :

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      console.log("wait");
    }, 1000);

    if (title === "" || description === "" || tags === "" || coverUrl === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (
      Content === "" ||
      Content === "<p><br></p>" ||
      Content === null ||
      Content === "<p></p>"
    ) {
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

      // const res = await axios.put(
      //   `https://back-e0rl.onrender.com/api/blogs/update/${blogId}`,
      //   {
      //     title,
      //     imgUrl: coverUrl,
      //     desc: description,
      //     tags,
      //     Author: currentUser.name,
      //     Content : JSON.stringify(content1),
      //   },
      //   config
      // );

      const res = await instance.put(
        `/api/blogs/update/${blogId}`,
        {
          title,
          imgUrl: coverUrl,
          desc: description,
          tags,
          Author: currentUser.name,
          Content: JSON.stringify(content1),
        },
        config
      );

      dispatch(resetForm());
      toast.success("Blog uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  //blog submmision function handlere ;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if location is /Edit/:id then do not execute the code below execute another function L
    if (location.pathname == "/Edit/:id") {
      handleEditSubmit();
      return;
    }

    if (Content === "") {
      toast.error("Please fill all the fields");
      return;
    }

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
      // const res = await axios.post(
      //   'https://back-e0rl.onrender.com/api/blogs/uploadBlog',
      //   {
      //     title,
      //     imgUrl: coverUrl,
      //     desc: description,
      //     tags,
      //     Author: currentUser.name,
      //     Content : JSON.stringify(content1),
      //   },
      //   config
      // );
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
        config
      );

      dispatch(resetForm());

      toast.success("Blog uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`${
          location.pathname === "/Write" ||
          location.pathname === "/Edit/:blogId"
            ? "border-b-[1px] fixed top-0 w-full z-50 shadow-sm mb-24"
            : "border-b-[1px] z-50 shadow-sm sticky"
        } bg-white`}
      >
        <div className="grid grid-cols-12 gap-[1rem] p-3 mx-4 ">
          <div className="col-span-3">
            <a href="/Home">
              <img
                src="../Images/logo-standard.png"
                alt="logo"
                className="h-6 lg:h-8 mt-[5px] hidden lg:block"
              />
              <img
                src="../Images/favicon.png"
                alt="logo"
                className="h-12 mt-[7px] block lg:hidden"
              />
            </a>
          </div>
          <div className="flex col-span-6 gap-4">
            <div>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                whileDrag={{ scale: 0.9 }}
                onClick={() => navigate("/Home")}
                className="border hidden lg:block border-gray-300 rounded-full px-4 py-2 text-sm  
                    font-semibold text-gray-700 mr-2 hover:bg-gray-100"
              >
                Your Feed
              </motion.button>
            </div>

            <div
              className="flex flex-row-reverse focus-within:border rounded-full lg:px-4 lg:py-2 lg:pr-[16rem] 
             text-sm 
             focus-within:border-secondary"
            >
              <input
                type="text"
                value={search}
                onChange={handleChange}
                className="border-none focus:outline-none   lg:w-full text-primary"
                placeholder="Search FlashPost"
              />
              <div className="  h-full flex items-center lg:pr-2">
                <CiSearch className="text-xl text-gray-400" />
              </div>
            </div>
          </div>
          {currentUser && (
            <div className="flex col-span-3 justify-around w-full">
              <div>
                {location.pathname === "/Write" ||
                location.pathname.startsWith("/Edit/") ? (
                  <button
                    onClick={
                      location.pathname.startsWith("/Edit/")
                        ? handleEditSubmit
                        : handleSubmit
                    }
                    className="w-full bg-primary rounded-full flex gap-2 px-4 py-2 text-sm font-semibold text-secondary mr-2 hover:bg-secondary hover:text-primary  transition-all"
                  >
                    <PiBroadcastFill className="text-xl hover:animate-pulse" />
                    {location.pathname.startsWith("/Edit/")
                      ? "UpdateBlog"
                      : "Publish"}
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.9 }}
                    whileDrag={{ scale: 0.9 }}
                    onClick={() => history.push("/Write")}
                    className="w-full bg-primary rounded-full lg:flex hidden gap-2 px-4 py-2 text-sm font-semibold text-secondary mr-2 hover:bg-secondary hover:text-primary  transition-all"
                  >
                    <Link to="/Write" className="flex gap-1">
                      <MdCreate className="text-xl text-gray-200" />
                      Create
                    </Link>
                  </motion.button>
                )}
              </div>
              <div className="flex justify-between gap-7">
                <button>
                  <IoNotificationsOutline className="text-2xl lg:flex hidden text-gray-400 hover:text-secondary" />
                </button>
                <button>
                  {/* <RxAvatar className='text-4xl text-gray-400' /> */}
                  <MouseOverPopover name={authUser.name} className="text-4xl" />
                </button>
              </div>
            </div>
          )}

          {!currentUser && (
            <div>
              <div className="mx-36 flex col-span-3 gap-3 justify-around w-full">
                <div>
                  <button
                    onClick={() => navigate("/")}
                    className=" w-full bg-secondary rounded-full px-4 py-2 text-sm
                font-semibold text-primary hover:bg-gray-100"
                  >
                    <p> Login</p>
                  </button>
                </div>
                <button
                  onClick={() => navigate("/signup")}
                  className=" w-full bg-primary rounded-full flex gap-2 px-4 py-2 text-sm
                font-semibold text-secondary mr-2 hover:bg-gray-100"
                >
                  <p> SignUp</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NavBar;