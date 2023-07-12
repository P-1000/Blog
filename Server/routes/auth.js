import express from "express"
import { verify } from "jsonwebtoken"
import { signup , signin, cookie_read } from "../Controllers/auth.js"
import { verifyToken } from "../Verify.js"
import { findUserByName , passwordReset} from "../Controllers/auth.js"


const router = express.Router()

//create user 

router.post("/signup", signup )

//sign in 
router.post("/signin", signin  )

router.get("/read", verifyToken , cookie_read )


//find user by name :
router.get("/find/:name", findUserByName )

// follow user


// todo google login : 

// password reset : 

router.post("/password-rest"  , passwordReset)


export default router
