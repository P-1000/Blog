import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import { redbro } from "../Controllers/user.js"

const router = express.Router()

//update user:

// router.put("/:id", updateUser )

//test 
router.put("/testr", redbro)

export default router
