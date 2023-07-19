import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import {redbro } from "../Controllers/user.js"
import {follow} from "../Controllers/user.js"
import {uploadProfilePicture} from "../Controllers/user.js"
import {  getUserByName , fetchUserBookmarks , editProfile , getUser_Name} from "../Controllers/user.js"


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

// add to bookmarks : 
router.put("/:id/addBookmark", verifyToken, addBookmark)



export default router
