import express from "express"
import { signup , signin } from "../Controllers/auth.js"
import {test} from "../Controllers/user.js"

const router = express.Router()

//create user 

router.post("/signup", signup )

//sign in 
router.post("/signin", signin  )

//google login
router.post("/signinG",   )

export default router
