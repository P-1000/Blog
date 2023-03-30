import express from "express"
import { verify } from "jsonwebtoken"
import { signup , signin, cookie_read } from "../Controllers/auth.js"
import { verifyToken } from "../Verify.js"

const router = express.Router()

//create user 

router.post("/signup", signup )

//sign in 
router.post("/signin", signin  )

router.get("/read", verifyToken , cookie_read )

//google login
router.post("/signinG",   )

export default router
