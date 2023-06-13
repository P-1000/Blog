import User from '../Models/User.js'
import { createError } from '../error.js'


// export const updateUser = async (req, res, next) => {
//     res.staus(200).json({message: "update user"})
// }


export const redbro = async (req, res, next) => {
    if (req.params.id === '64234329867fe897afe45cb0') {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can update only your account!"));
    }
  };

  // follow user add to following array and increment followers
export const follow = async (req, res, next) => {
  if (req.params.id !== '64234329867fe897afe45cb0') {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById('64234329867fe897afe45cb0');
      if (!user.followers.includes('64234329867fe897afe45cb0')) {
        await user.updateOne({ $push: { followers: '64234329867fe897afe45cb0' } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
}

//follow 


// upload profile picture : put string url in profile pic
export const uploadProfilePicture = async (req, res, next) => {
  const { id } = req.params;
  const { bodyPicture } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { ProfilePic: bodyPicture },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};



// get user by Name : only finds profile pic : used in AuthoImg.jsx
export const getUserByName = async (req, res, next) => {
  const { name } = req.params;
  try{
    const usr = await User.findOne({name: name})  
    if(!usr){
      return res.status(404).json('https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1686593562~exp=1686594162~hmac=f005e8ed7cd56c39de3f6f72ab0b1b59e49341632842e37dd41b151dfac52adc')
    }
    res.status(200).json(usr.ProfilePic);
  }catch(err){
    next(err)
    res.status(500).json({message: "server error"})
  }
};


// fetch user bookmarks :
export const fetchUserBookmarks = async (req, res, next) => {
  const { id } = req.params;
  try {
   //find user by name
   const user = await User.findOne({name: id});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.Bookmarks);
  } catch (err) {
    next(err);
  }
};

// edit user profile :
export const editProfile = async (req, res, next) => {
  const { id } = req.params;
  const { bio, name, email } = req.body;
  try {
    const user = await User.findById(id);
    if(!user) return res.status(404).json({message: "user not found"})
    if (user._id.toString() === id) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { bio, name, email } },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      return res.status(403).json({ message: "You can update only your account!" });
    }
  } catch (err) {
    next(err);
  }
};


export const testbro = async (req, res, next) => {
  res.status(200).json({message: "test bro"})
}
