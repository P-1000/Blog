import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import {redbro } from "../Controllers/user.js"
import {follow} from "../Controllers/user.js"
import {uploadProfilePicture} from "../Controllers/user.js"
import {testbro , getUserByName , fetchUserBookmarks} from "../Controllers/user.js"


const router = express.Router()

//update user:

// router.put("/:id", updateUser )

//test 
router.put("/testr", redbro)

//follow user
router.put("/:id/follow", verifyToken, follow)

// upload profile picture
 router.put("/:id/uploadProfile", uploadProfilePicture)

 router.put("/:id/test" , testbro)

 router.get("/userProfile/:name", getUserByName)

 //fetch user bookmarks : 
router.get("/:id/bookmarks",  fetchUserBookmarks)


export default router
