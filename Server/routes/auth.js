import express from "express"
// import { verify } from "jsonwebtoken"
import { signup , signin, cookie_read } from "../Controllers/auth.js"
import { verifyToken } from "../Verify.js"
import { findUserByName , passwordReset , tokenValidation , passwordResetAck} from "../Controllers/auth.js"
import rateLimit from "express-rate-limit"



const router = express.Router()

// Rate limiter middleware for login 
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Too many login attempts from this IP, please try again later.',
    standardHeaders: true,
    
});

// Rate limiter middleware for signup
const signupRateLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 5,
    message: 'Too many accounts created from this IP, please try again after an hour',
});


//create user 

router.post("/signup",signupRateLimiter ,  signup )

//sign in 
router.post("/signin",loginRateLimiter ,  signin  )

router.get("/read", verifyToken , cookie_read )


//find user by name :
router.get("/find/:name", findUserByName )

// follow user


// todo google login : 

// password reset : 

router.post("/password-rest" ,  passwordReset)

// validate token :
 router.post("/validate-password-token/:token" ,  tokenValidation)

 //send mail to user for conformation :
    router.post("/password-reset-ack" , passwordResetAck)





export default router

