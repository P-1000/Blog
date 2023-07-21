import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { useDispatch } from 'react-redux';
 import { loginStart, loginFailure } from '../../redux/userSlice';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");

   const dispatch = useDispatch();
  const navigate = useNavigate();


  // form validation :
  const validate = () => {
    if (email.length === 0) {
      toast.error("Email is required");
      return false;
    }
    if (name.length === 0) {
      toast.error("Name is required");
      return false;
    }
    if (password.length === 0) {
      toast.error("Password is required");
      return false;
    }
    if(password.length < 6){
      toast.error("Password must be atleast 6 characters long");
      return false;
    }
    if(!email.includes("@")){
      toast.error("Invalid Email");
      return false;
    }
    if(name.length < 3){
      toast.error("Username must be atleast 3 characters long");
      return false;
    }
    if(name.includes(" ")){
      toast.error("Username cannot contain spaces");
      return false;
    }
    // no special characters allowed in username only alphabets , numbers and underscore allowed
    var regex = /^[a-zA-Z0-9_]*$/;
    if(!regex.test(name)){
      toast.error("Username cannot contain special characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // form validation :
    const isValid = validate();
    if(!isValid){
      return;
    }
   dispatch(loginStart())
   // console.log(`Email: ${email}, Password: ${password}`);
   try {
      const res = await axios.post('https://back-e0rl.onrender.com/api/auth/signup', { name,password , email});
      navigate('/')
      toast.success("Account Created Successfully");
   } catch (error) {
     dispatch(loginFailure())
      toast.error(error.response.data.message)
   }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create FlashPost Account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
        </form>
</div>
</div>
</div>



  )
}
export default Register;
         
