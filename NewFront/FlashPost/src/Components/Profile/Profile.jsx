import React from 'react'
import {CiShare1} from 'react-icons/ci'
import {HiBackspace, HiBan, HiCreditCard, HiPlus} from 'react-icons/hi'
import {AiFillFacebook, AiFillGithub, AiFillWeiboSquare} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillTwitterCircle} from 'react-icons/ai'
import {BsGlobe} from 'react-icons/bs'
import {CiLocationOn} from 'react-icons/ci'
import {SlCalender} from 'react-icons/sl'
import {IoLogoJavascript} from 'react-icons/io'
import {SiJavascript} from 'react-icons/si'
import {SiTypescript} from 'react-icons/si'
import {TiHtml5} from 'react-icons/ti'
import {FaReact} from 'react-icons/fa'
import {RiProductHuntFill, RiVuejsFill} from 'react-icons/ri'
import {SiNextdotjs} from 'react-icons/si'
import {DiNodejs} from 'react-icons/di'
import {DiMongodb} from 'react-icons/di'
import {DiDocker} from 'react-icons/di'
import {SiTailwindcss} from 'react-icons/si'
import {SiRedux} from 'react-icons/si'
import {FaJava} from 'react-icons/fa'
import SelfPosts from './SelfPosts'
import {AiFillEdit} from 'react-icons/ai'
import { useEffect , useState } from 'react'
import { json, useParams } from 'react-router-dom'
import ImageKit from 'imagekit';
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'
import { useRef } from 'react'
import axios from 'axios'
import { Modal } from '@mui/material'
import FollowersModal from './FollowerModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './Edit'



function Profile() {
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
    const [profileImg , setProfileImg] = useState('');
    const fileInputRef = useRef(null);

    //token from local storage :
    const token = localStorage.getItem('jwt');
    const tok = JSON.parse(token);
    const config = {
        headers: { Authorization: `Bearer ${tok}` }
    }

    //getting user of profile :
    const {User} = useParams();
    //pop first char of user id :
    const User1 = User.slice(1);
//current user
    const usr =  localStorage.getItem('user');

   

    const us = JSON.parse(usr);

    useEffect(() => {
    
        getUser();

    },[]);
    
    const getUser = async () => {
      const res = await axios.get(`https://back-e0rl.onrender.com/api/auth/find/${User1}`);
      const data = await res.data;
      setUser(data[0]);
      const userProfilePic = user.ProfilePic;
      setProfileImg(userProfilePic);
      countFollowers(data[0].Followers);
      countFollowing(data[0].Following);
  }


const followID = user?._id;


 //check if current user is following the user of profile :
 const currentUser = JSON.parse(localStorage.getItem('user'));
 const isFollowing = currentUser.Following?.includes(user._id);
 const [isFollowing1, setF1] = useState(isFollowing);

 useEffect(() => {
  setF1(isFollowing);
}, [isFollowing]);



 // follow button :
    async function follow() {
        const res = await axios.post('https://back-e0rl.onrender.com/api/follow', 
        {
          userId: us._id,  //current user from local storage bro marchipoku : 
          followId: followID ? followID : followID,    //user of profile : from params name : User
        }, config);
        setF1(true);

        getUser();
    }

    //Unfollow button :
    async function Unfollow() {
      const res = await axios.post('https://back-e0rl.onrender.com/api/unfollow',
      {
        userId: us._id,  //current user from local storage bro marchipoku :
        unfollowId: followID ? followID : null,    //user of profile : from params name : User
      }, config);
      setF1(false);
     getUser();
  }


     //count followers :
     const countFollowers = (followers) => {
      setUserFollowersCount(followers.length);
  }

    // count following :
    const countFollowing = (following) => {
        setUserFollowingCount(following.length);
    }

//change follow button state when clicked :
const [followState, setFollowState] = useState(false);

const followBtn = () => {
    setFollowState(!followState);
}

//  ****** Profile Pic Section : ****

//change profile pic :
const [file, setFile] = useState(null);
const [preview, setPreview] = useState(null);

  //headers for imagekit.io
  const imagekit = new ImageKit({
    publicKey:"public_URvjzrf8cUDwCO0A6NK3VOYWg1U=",
    urlEndpoint:"https://ik.imagekit.io/cwq19b8fi",
    privateKey:"private_gR6kfpKknhbtLmBe7OXtwKJ19h0=",
    authenticationEndpoint:"localhost:5173",
  });


  // check for current usr : 

  const [currentUsrornot , setCurrentUsrornot] = useState(false);

  function checkCurrentUser() {
    if(us._id === user._id){
      setCurrentUsrornot(true)
      return true;
    }
    else{
      return false;
    }
  }

  const handleProfilePicClick = () => {
    if(checkCurrentUser()){
      fileInputRef.current.click();
    }
   else{
      return;
    }

  };


  //upload profile pic :
const handleFile = async(file1) => {
  try {
    const profileUpload = await imagekit.upload({
      file: file1,
      fileName: file1.name,
      folder: "/profile",
      tags: ["profile"],
    //  responseFields: ["url", "fileId", "height", "width", "tags"],
    });
    setProfileImg(profileUpload.url);
    uploadProfilePic(profileUpload.url);  // db ki url ni push chey bro!: 

  } catch (error) {
    console.log(error)
  }
}

//upload profile pic to db :
const uploadProfilePic = async (url) => {
  try {
    const res = await axios.put(`https://back-e0rl.onrender.com/api/users/${us._id}/uploadProfile`,
    {
      bodyPicture: url,
    }, config);
    getUser();
  } catch (error) {
    console.log(error)
  }
}


//is the profile is of current user :
const isCurrentUser = us._id === user._id;



 

  return (
    <>
        <div>
          <div className='bg-white w-full  rounded-md mt-8 border-[1px] overflow-hidden'>
                <div className='flex' >
                    <div className='flex justify-center items-center'>

                        <div className='p-10 ml-7 flex gap-6'>
                        <img 
                        onClick={handleProfilePicClick}
                            className='w-32 h-32 rounded-full object-cover cursor-pointer object-right'
                                 src={user.ProfilePic} />
                                 <input
                                  ref={fileInputRef}
                                 style={{ display: 'none' }}
                                  type="file" onChange={(file) => handleFile(file.target.files[0])} />
                                 <div className='flex flex-col w-[75%]'>
                                 <div >
                                        <h1 className='text-3xl font-semibold mt-1 mb-2'>
                                            {user?.name}
                                        </h1>
                                        <p>Welcome to my blog! I'm  
                                          { "  " + " " +  user?.name}
                                          , a software developer with a passion for creating elegant and efficient solutions to complex problems. Through my blog.</p>
                                 </div>
                                 <div className='flex gap-4 mt-4'>
                                
                                    <h1 
                                    // onClick={() => setUserReactions(user?.Reactions)}
                                    className='flex '>
                                        <span className='text-sm font-semibold'>
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
                                    <h1 className='flex'>
                                        <span className='text-sm font-semibold'>
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
                               <div>
                               
                               </div>
                            </div>
                {/* side follow and buttons   */}
                          {
                            isCurrentUser ? 

                            <div>
                            <div className='mt-8 mr-28'>   
                                <div 
                                
                                className='flex gap-4 '>
                                   <div className='border rounded-full mt-1 h-10 w-10'>
                                   <CiShare1 className='text-xl  mt-[10px] mx-[9.2px]'/>
                                   </div>
                                    {/* <button className='bg-primary text-white font-semibold py-2 px-4 rounded-md'>Share</button> */}
                                   <div className='flex flex-row-reverse gap-[6px] bg-primary text-white font-semibold py-2 px-4 rounded-full'>
                                   <AiFillEdit  className='text-xl  mt-[4.7px] '/>
                                  <button 
                                    // onClick={Unfollow}
                                    className='pr-1'>
                                    <Edit />
                                    </button>
                                   </div>
                                    
                                    
                            </div>
                            </div>
                            </div>
                            
                               : <div className='mt-8 mr-28'>   
                                <div 
                                
                                className='flex gap-4 '>
                                   <div className='border rounded-full mt-1 h-10 w-10'>
                                   <CiShare1 className='text-xl  mt-[10px] mx-[9.2px]'/>
                                   </div>
                                    {/* <button className='bg-primary text-white font-semibold py-2 px-4 rounded-md'>Share</button> */}
                                   <div className='flex flex-row-reverse gap-[6px] bg-primary text-white font-semibold py-2 px-4 rounded-full'>
                                  {
                                    isFollowing1 ?   <HiBackspace  className='text-xl  mt-[4.7px] '/> : <HiPlus className='text-xl  mt-[4.7px] '/>
                                  }
                                   {
                                    isFollowing1 ? 
                                    <button 
                                    onClick={Unfollow}
                                    className='pr-1'>Unfollow</button>
                                     : 
                                     <button  onClick={follow}
                                    className='pr-1'>Follow</button>
                                   }
                                   </div>
                                    
                                    
                            </div>
                            </div>
                          }
                            </div>
                            {/* social buttons   */}
                 <div className='border py-3 float-center rounded-md mx-20 pb-2 mb-2'>
                 <div className='flex mt-2 gap-14 justify-center '>
                       <div className='flex justify-center items-center '>
                                <div className='flex gap-4'>
                                        <div className='flex gap-2 h-8 '>
                                        <BsGlobe className='text-lg text-gray-600  mt-[1.8px] '/>
                                        </div>
                                        <div className='flex gap-2 h-8'>
                                        <AiFillLinkedin className='text-xl text-gray-600   mt-[1px] '/>
                                        </div>
                                        <div className='flex gap-2 h-8'>
                                          <AiFillGithub className='text-xl  mt-[1px] text-gray-600  '/>
                                        </div>
                                        </div>
                                        </div>

                                       <div >
                                       <div className='flex gap-1'>
                                          <CiLocationOn className='text-xl  text-gray-600  '/>
                                          <h1 className='text-sm font-normal text-gray-600'>Tokyo, Japan</h1>
                                        </div> 

                                       </div>
                                       <div className='flex gap-2'>
                                          <SlCalender className='text-xl  text-gray-600  '/>
                                          <h1 className='text-sm font-normal text-gray-600'>
                                            Member since  2021
                                          </h1>
                                          </div>
                       </div>
                 </div>
                 <div className=' mt-8 border py-3 float-center rounded-md mx-20'>
                  <h1 className='text-xl font-semibold justify-center ml-96 tracking-wide '>My Tech Stack</h1>
                  <div>
                    <div className='flex gap-8 p-2 justify-center'>
                        <SiJavascript className='text-3xl text-primary   mt-4'/>
                        <TiHtml5 className='text-3xl text-primary  mt-4'/>
                        <SiTypescript className='text-3xl text-primary   mt-4'/>
                        <FaReact className='text-3xl text-primary   mt-4'/>
                        <RiVuejsFill className='text-3xl text-primary   mt-4'/>
                        <SiNextdotjs className='text-3xl text-primary  mt-4'/>
                        <DiNodejs className='text-3xl text-primary   mt-4'/>
                        <DiMongodb className='text-3xl text-primary   mt-4'/>
                        <DiDocker className='text-3xl text-primary   mt-4'/>
                        <SiTailwindcss className='text-3xl text-primary  mt-4'/>
                        <SiRedux className='text-3xl text-primary   mt-4'/>
                        <FaJava className='text-3xl text-primary   mt-4'/>
                      </div>
                  </div>
                  </div>
                  <div className='mt-8 border py-3 float-center rounded-md mx-20'>
                    <div>
                      <h1 className='text-xl font-semibold justify-center px-10 tracking-wide '>My Latest Posts</h1>
                    </div>
                    <div>
                      <SelfPosts /> 
                    </div>
                  </div>
                </div>
              

          </div>
          <ToastContainer />
    </>
  )
}

export default Profile