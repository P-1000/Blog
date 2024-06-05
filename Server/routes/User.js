import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import {redbro, removeBookmark } from "../Controllers/user.js"
import {follow} from "../Controllers/user.js"
import {uploadProfilePicture} from "../Controllers/user.js"
import {  getUserByName , fetchUserBookmarks ,basic_user ,  editProfile , getUser_Name , addBookmark , getUserById} from "../Controllers/user.js"


const router = express.Router()

//update user:

// router.put("/:id", updateUser )

//test 
router.put("/testr", redbro)

//follow user
router.put("/:id/follow", verifyToken, follow)

// upload profile picture
 router.put("/:id/uploadProfile", uploadProfilePicture)

 router.get("/userProfile/:name", getUserByName)

 //fetch user bookmarks : 
router.get("/:id/bookmarks",  fetchUserBookmarks)

//Edit user profile :
router.put("/:id/editProfile", verifyToken, editProfile)



//get user by name his details

router.get("/:name", getUser_Name)

//get only user name and profile picture: 

router.get("/basicname/:name", basic_user)

// add to bookmarks : 
router.put("/:id/addBookmark", verifyToken, addBookmark)

router.put("/:id/removeBookmark", verifyToken, removeBookmark)

// get user by id : 
router.get("/fetchId/:id", getUserById)







export default router
