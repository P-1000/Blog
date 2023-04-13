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






export const testbro = async (req, res, next) => {
  res.status(200).json({message: "test bro"})
}
