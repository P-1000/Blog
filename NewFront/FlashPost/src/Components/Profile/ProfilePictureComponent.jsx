import React, { useRef , useContext } from "react";
import { motion } from "framer-motion";
import ImageKit from "imagekit";
import axios from "axios";
import { AuthContext } from "../../context/userContext";

const ProfilePictureComponent = ({ user, getUser }) => {
  const { authUser, token, setAuthUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const imagekit = new ImageKit({
    publicKey: "public_URvjzrf8cUDwCO0A6NK3VOYWg1U=",
    urlEndpoint: "https://ik.imagekit.io/cwq19b8fi",
    privateKey: "private_gR6kfpKknhbtLmBe7OXtwKJ19h0=",
    authenticationEndpoint: "localhost:5173",
  });

  const handleProfilePicClick = () => {
    if (authUser._id === user._id) {
      fileInputRef.current.click();
    }
  };

  const handleFile = async (file) => {
    try {
      const profileUpload = await imagekit.upload({
        file,
        fileName: file.name,
        folder: "/profile",
        tags: ["profile"],
      });

      await axios.put(
        `https://back-e0rl.onrender.com/api/users/${authUser._id}/uploadProfile`,
        { bodyPicture: profileUpload.url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthUser((prevUser) => ({
        ...prevUser,
        ProfilePic: profileUpload.url,
      }));
      getUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.img
        whileTap={{ scale: 0.9 }}
        onClick={handleProfilePicClick}
        className="w-32 h-32 rounded-full object-cover cursor-pointer object-right"
        src={user?.ProfilePic}
      />
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </>
  );
};

export default ProfilePictureComponent;
