import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Edit = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  //get current user id
  const usr = localStorage.getItem("user");
  const parseUser = JSON.parse(usr);
  const currentId = parseUser?._id;

  const token = localStorage.getItem("jwt");
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` },
  };

  const [name, setName] = useState(parseUser?.name);
  const [email, setEmail] = useState(parseUser?.email);
  const [bio, setBio] = useState(parseUser?.Bio);
  const [place, setPlace] = useState(parseUser?.Location);

  const handleUpdate = async () => {
    try {
      const url = `http://back-e0rl.onrender.com/api/users/${currentId}/editProfile`;

      const response = await axios.put(
        url,
        { name, email, bio, place },
        config
      );
      console.log(response);
      if (response.status === 200) {
        //put user in local storage
        localStorage.setItem("user", JSON.stringify(response.data));
        toggleModal();
        alert("Profile updated successfully");
        return window.location.replace(`/Profile/@${response.data.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.button
        whileFocus={{ scale: 1.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleModal}
        className="block text-white  font-medium rounded-lg text-sm text-cente"
        type="button"
      >
        Edit
      </motion.button>

      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="fixed top-1/2 left-[60%] transform -translate-x-1/2 px-10 py-20 -translate-y-1/2 z-50 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative rounded-lg shadow bg-slate-50 px-2 py-1">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-bold font-mono text-primary dark:text-white">
                  Edit Profile
                </h3>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium float-left text-gray-900 "
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-primary text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={name || "Enter your name"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block mb-2 text-sm font-medium float-left text-gray-900 dark:text-white"
                    >
                      Your bio
                    </label>
                    <textarea
                      name="bio"
                      id="bio"
                      cols={130}
                      onChange={(e) => setBio(e.target.value)}
                      className="bg-gray-50  border-primary text-gray-900 text-sm rounded-lg border focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={bio || "Write something about yourself..."}
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="social-links"
                      className="block float-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Place
                    </label>
                    <input
                      uytvty
                      onChange={(e) => setPlace(e.target.value)}
                      type="text"
                      name="social-links"
                      id="social-links"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={place || "Hyderabad , India"}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleUpdate}
                    className="w-full text-white bg-secondary hover:bg-secondary/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Update Profiles
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
