import React from "react";
import { CiShare1 } from "react-icons/ci";
import { HiBackspace, HiBan, HiCreditCard, HiPlus } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState, useContext } from "react";
import { json, useParams } from "react-router-dom";
import ImageKit from "imagekit";
import { useRef } from "react";
import axios from "axios";
import { Modal } from "@mui/material";
import FollowersModal from "./FollowerModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";
import { motion } from "framer-motion";
import instance from "../../Config/AxiosInst";
import TechStack from "./TechStack";
import SocialLinks from "./SocialLinks";
import LatestPosts from "./LatestPosts";
import { AuthContext } from "../../context/userContext";
import ProfileHeader from "./ProfileHeader";
import ProfilePictureComponent from "./ProfilePictureComponent";

function ProfileComponent() {
  const { authUser, isLoading } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userBlogsCount, setUserBlogsCount] = useState(0);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowingCount, setUserFollowingCount] = useState(0);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowersCount, setUserFollowersCount] = useState(0);
  const [userLikes, setUserLikes] = useState([]);
  const [userLikesCount, setUserLikesCount] = useState(0);
  const [userComments, setUserComments] = useState([]);
  const [userCommentsCount, setUserCommentsCount] = useState(0);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userBookmarksCount, setUserBookmarksCount] = useState(0);
  const [userViews, setUserViews] = useState([]);
  const [userViewsCount, setUserViewsCount] = useState(0);
  const [userTags, setUserTags] = useState([]);
  const [userTagsCount, setUserTagsCount] = useState(0);
  const [userReactions, setUserReactions] = useState([]);

  //profile pic
  const [profileImg, setProfileImg] = useState("");
  const fileInputRef = useRef(null);

  //token from local storage :
  const token = localStorage.getItem("jwt");
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` },
  };

  //getting user of profile :
  const { User } = useParams();
  //pop first char of user id :
  const User1 = User.slice(1);
  //current user
  const usr = localStorage.getItem("user");

  const us = JSON.parse(usr);
  const idus = us._id;
  const memebersince = us.createdAt;
  const loc = us?.Location;

  useEffect(() => {
    if (User1) {
      getUser();
    } else {
      toast.error("User not found"); 
    }
  }, [User1]);

  const getUser = async () => {
    try {
      const res = await instance.get(`/api/auth/find/${User1}`);
      const data = res.data;
      setUser(data[0]);
      countFollowers(data[0]?.Followers);
      countFollowing(data[0]?.Following);
    } catch (error) {
      toast.error("Error fetching user data");
    }
  };

  const followID = user?._id;

  //check if current user is following the user of profile :
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isFollowing = currentUser.Following?.includes(user._id);
  const [isFollowing1, setF1] = useState(isFollowing);

  useEffect(() => {
    setF1(isFollowing);
  }, [isFollowing]);

  // follow button :
  async function follow() {
    //if user not logged in redirect to login page :
    if (!tok) {
      window.location.href = "/";
    }

    const res = await axios.post(
      "https://back-e0rl.onrender.com/api/follow",
      {
        userId: idus, //current user from local storage bro marchipoku :
        followId: followID, //user of profile : from params name : User
      },
      config
    );
    setF1(true);

    getUser();
  }

  //Unfollow button :
  async function Unfollow() {
    //if user not logged in redirect to login page :
    if (!tok) {
      window.location.href = "/";
    }

    const res = await axios.post(
      "https://back-e0rl.onrender.com/api/unfollow",
      {
        userId: idus, //current user from local storage bro marchipoku :
        unfollowId: followID, //user of profile : from params name : User
      },
      config
    );
    setF1(false);
    getUser();
  }

  //count followers :
  const countFollowers = (followers) => {
    setUserFollowersCount(followers.length);
  };

  // count following :
  const countFollowing = (following) => {
    setUserFollowingCount(following.length);
  };

  //change follow button state when clicked :
  const [followState, setFollowState] = useState(false);

  const followBtn = () => {
    setFollowState(!followState);
  };

  // check for current usr :

  const [currentUsrornot, setCurrentUsrornot] = useState(false);

  function checkCurrentUser() {
    if (us._id === user._id) {
      setCurrentUsrornot(true);
      return true;
    } else {
      return false;
    }
  }

  //is the profile is of current user :
  const isCurrentUser = us._id === user._id;

  return (
    <>
    {/* <ProfileHeader user={user} 
      isCurrentUser={isCurrentUser}
      follow={follow}
      Unfollow={Unfollow}
    /> */}
      <div>
        <div className="bg-white w-full  rounded-md mt-8 border-[1px] overflow-hidden">
          <div className="flex">
            <div className="flex justify-center items-center">
              <div className="p-10 ml-7 flex gap-6">
                <ProfilePictureComponent user={user} getUser={getUser} />
                <div className="flex flex-col w-[75%]">
                  <div>
                    <h1 className="text-3xl font-semibold mt-1 mb-2">
                      {user?.name}
                    </h1>
                    {user?.Bio ? (
                      user?.Bio
                    ) : (
                      <p>
                        Welcome to my blog! I'm
                        {"  " + " " + user?.name}, a software developer with a
                        passion for creating elegant and efficient solutions to
                        complex problems. Through my blog.
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <h1
                      // onClick={() => setUserReactions(user?.Reactions)}
                      className="flex "
                    >
                      <span className="text-sm font-semibold">
                        {/* {userFollowersCount ? userFollowersCount : 0} */}
                        <FollowersModal
                          followers={userFollowersCount}
                          fof={false}
                          following={userFollowingCount}
                          user={user}
                        />
                      </span>
                      {/* <span className='text-sm font-normal'>Followers</span> */}
                    </h1>
                    <h1 className="flex">
                      <span className="text-sm font-semibold">
                        {/* {userFollowingCount ? userFollowingCount : 0} */}
                      </span>
                      <FollowersModal
                        followers={userFollowersCount}
                        following={userFollowingCount}
                        fof={true}
                        user={user}
                      />
                      {/* <span className='text-sm font-normal'>Following</span> */}
                    </h1>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            {/* side follow and buttons   */}
            {isCurrentUser ? (
              <div>
                <div className="mt-8 mr-28">
                  <div className="flex gap-4 ">
                    <div className="border rounded-full mt-1 h-10 w-10">
                      <CiShare1 className="text-xl  mt-[10px] mx-[9.2px]" />
                    </div>
                    {/* <button className='bg-primary text-white font-semibold py-2 px-4 rounded-md'>Share</button> */}
                    <div className="flex flex-row-reverse gap-[6px] bg-primary text-white font-semibold py-2 px-4 rounded-full">
                      <AiFillEdit className="text-xl  mt-[4.7px] " />
                      <button
                        // onClick={Unfollow}
                        className="pr-1"
                      >
                        <Edit />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 mr-28">
                <div className="flex gap-4 ">
                  <div className="border rounded-full mt-1 h-10 w-10">
                    <CiShare1 className="text-xl  mt-[10px] mx-[9.2px]" />
                  </div>
                  {/* <button className='bg-primary text-white font-semibold py-2 px-4 rounded-md'>Share</button> */}
                  <div className="flex flex-row-reverse gap-[6px] bg-primary text-white font-semibold py-2 px-4 rounded-full">
                    {isFollowing1 ? (
                      <HiBackspace className="text-xl  mt-[4.7px] " />
                    ) : (
                      <HiPlus className="text-xl  mt-[4.7px] " />
                    )}
                    {isFollowing1 ? (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={Unfollow}
                        className="pr-1"
                      >
                        Unfollow
                      </motion.button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={follow}
                        className="pr-1"
                      >
                        Follow
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* social buttons   */}
          <div>
            <SocialLinks
             />
          </div>
          <div>
            <TechStack
             />
          </div>
          <div>
            <LatestPosts />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProfileComponent;
