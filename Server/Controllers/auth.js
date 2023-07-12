import mongoose from "mongoose"
import User from "../Models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../error.js"
import randToken from 'rand-token';
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import dotenv from "dotenv"


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


//follow user
export const followFunc = async (req, res) => {
    try {
      const { userId, followId } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const [cu, fu] = await Promise.all([User.findById(userId), User.findById(followId)]);
  
      if (!cu || !fu) {
        return res.status(404).json({ message: "User not found" });
      }
      if (cu.Following.includes(followId)) {
        return res.status(403).json({ message: "You already follow this user" });
      }
      await User.bulkWrite([
        { updateOne: { filter: { _id: cu._id }, update: { $push: { Following: followId } } } },
        { updateOne: { filter: { _id: fu._id }, update: { $push: { Followers: userId } } } },
      ]);
  
      return res.status(200).json({ message: "User has been followed" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }


//unfollow user
export const unfollowFunc = async (req, res) => {
    try {
      const { userId, unfollowId } = req.body;
      if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(unfollowId)){
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const [cu, fu] = await Promise.all([User.findById(userId), User.findById(unfollowId)]);
      if(!cu && !fu){
        return res.status(404).json({ message: "User not found" });
      }
      if(!cu.Following.includes(unfollowId)){
        return res.status(403).json({ message: "You don't follow this user" });
      }
      await User.bulkWrite([
        { updateOne: { filter: { _id: cu._id }, update: { $pull: { Following: unfollowId } } } },
        { updateOne: { filter: { _id: fu._id }, update: { $pull: { Followers: userId } } } },
      ]);
      return res.status(200).json({ message: "User has been unfollowed" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }


  //find user by name
export const findUserByName = async (req, res) => {
  try{
    const {name} = req.params
    const regex = new RegExp(`^${name}$`, 'i');
    const users = await User.find({ name: regex });
    // remove password from the response
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user._doc;
      return userWithoutPassword;
    }
    );
    return res.status(200).json(usersWithoutPassword);
  }
  catch(error){
    console.log(error)
    return res.status(500).json({ message: "Server error" });
}
}


// rest password 

export const sendMail = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: 'earn.vpn@gmail.com',
      subject: 'Hello from FlashPost',
      text: 'This is a test email from FlashPost!',
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    res.send('Email sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};

// mail config 



// password reset :

//token generator :
const generateResetToken = () => {
  const token = randToken.uid(29);
  return token;
};

export const passwordReset = async (req, res) => {

  const { email } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.PASSWORD,
      },
    });
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = generateResetToken();
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();


    // send email
    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: email,
      subject: 'Password Reset Request for FlashPost',
      html: `
        <p>Hi ${user.name},</p>
        <p>You have requested to reset your password.</p>
        <p>Click this <a href="http://localhost:5173/reset/${token}/${email}">link</a> to reset your password.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
        
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Password reset email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send password reset email.' });
  }

};



// validate reset token and update password
export const validateLoanToken = async (req, res) => {
  const { token } = req.params;
  const {email} = req.body
  const { password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.resetToken !== token) return res.status(400).json({ message: 'Invalid token' });
    if (Date.now() > user.resetTokenExpiry) return res.status(400).json({ message: 'Token expired' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
   next(error)
    res.status(500).json({ message: 'Failed to update password.' });
  }
};

    