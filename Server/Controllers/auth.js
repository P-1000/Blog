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
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET) //{expiresIn: "1d"}
         const {password, ...others} = user._doc
         res.cookie("access_token", token, 
         {httpOnly: true})
         .status(200)
         .json(others)
    } catch (error) {
        next(error)
    }

}