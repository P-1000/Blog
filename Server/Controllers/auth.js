import mongoose from "mongoose"
import User from "../Models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../error.js"
import jwt from "jsonwebtoken"

export const signup = async(req, res , next) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password, salt)
            const newUser = await User({...req.body, password : hash})
            await newUser.save()
            res.status(200).send("Signup Success!")
        } catch (error) {
            next(error)
        }

}


export const signin = async(req, res , next) => {
    try {
       const user = await User.findOne({name : req.body.name})
       if(!user) return next(createError(404, "User not found!"))
       const isMatch = await bcrypt.compare(req.body.password, user.password)
         if(!isMatch) return next(createError(400, "Invalid Credentials!"))
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET , {expiresIn: "1d"}) //
         const {password, ...others} = user._doc
         res.cookie("access_token", token , {
            expires: new Date(Date.now() + 86400000), // expires in 1 day
            httpOnly: true, // this will prevent JavaScript from accessing the cookie
          })
         .status(200)
         .json({token , user: others})
    } catch (error) {
        next(error)
    }

}

export const cookie_read = async(req, res , next) => {
    try {
        const token =  await req.headers.authorization.split(' ')[1]
        if(!token) return next(createError(401, "UnAuthorized!"))
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return next(createError(401, "UnAuthorized!"))
        const user = await User.findById(decoded.id).select("-password")
        res.json(user)
    } catch (error) {
        res.send(error)
    }
}
