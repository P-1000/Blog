import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Components/auth/Auth";
import BlogDetails from "./Components/MainContent/BlogDetails";
import Bookmark from "./Components/Bookmarks/Bookmark";
import CreatePost from "./Components/BlogCreation/CreatePost";
import EditPost from "./Components/MainContent/EditPost";
import Home from "./Components/MainContent/Home";
import NavBar from "./Components/Nav/NavBar";
import Profile from "./Components/Profile/Profile";
import Profile_Page from "./Components/Profile/Profile_Page";
import Register from "./Components/auth/Register";
import SearchRes from "./Components/Search/SearchRes";
import Forgot from "./Components/auth/Forgot";
import Reset from "./Components/auth/Reset";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "./Components/BlogCreation/EditorJs";
import LoginPage from "./Pages/Login";
import CurrentUserProfilePage from "./Pages/ProfilePage/CurrentUserProfilePage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/search/:query" element={<SearchRes />} />
        <Route path="/blog/:AuthorId/:blogId" element={<BlogDetails />} />
        <Route path="/Profile/:User" element={<Profile_Page />} />
        <Route path="/blog/:User" element={<CurrentUserProfilePage />} />
        <Route path="/Edit/:blogId" element={<EditPost />} />
        <Route path="/Bookmarks" element={<Bookmark />} />
        <Route path="/Write" element={<CreatePost />} />
        <Route path="/Blog/Content" element={<CreatePost />} />
        {/* <Route path="/Write/editor" element={<TextEditor />} /> */}
      </Routes>
    </div>
  );
}

export default App;
