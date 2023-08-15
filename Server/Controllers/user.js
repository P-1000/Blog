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
    const currentUserId = req.body.userId;
    const followId = req.body.followId;
  
    try {
      if (currentUserId === followId) {
        return res.status(403).json("You can't follow yourself");
      }
  
      const user = await User.findById(followId).select('followers');
      if (!user) {
        return res.status(404).json("User not found!");
      }
  
      const currentUser = await User.findById(currentUserId);
      if (!currentUser) {
        return res.status(404).json("Current user not found!");
      }
  
      if (!user.followers.includes(currentUserId)) {
        await Promise.all([
          user.updateOne({ $push: { followers: currentUserId } }),
          currentUser.updateOne({ $push: { following: followId } })
        ]);
  
        return res.status(200).json("User has been followed");
      } else {
        return res.status(403).json("You already follow this user");
      }
    } catch (err) {
      next(err);
    }
  };
  

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

//edit user profile

export const editProfile = async (req, res, next) => {
  const { id } = req.params;
  const { bio, name, email, place } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });

    if (user._id.toString() === id) {
      const updateFields = {};
      
      // Only update fields if they are provided in the request
      if (bio !== undefined) updateFields.Bio = bio;
      if (name !== undefined) updateFields.name = name;
      if (email !== undefined) updateFields.email = email;
      if (place !== undefined) updateFields.Location = place;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateFields },
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
;

// get user by name : 
export const getUser_Name = async (req, res, next) => {
  const { name } = req.params;
  try{
    const user = await User.findOne({name: name})
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    // dont send password as response :
    res.status(200).json(user);
  }catch(err){
    next(err)
    res.status(500).json({message: "server error"})
  }
};

// add to bookmarks :
export const addBookmark = async (req, res, next) => 
{
  const { id } = req.params;
  const { blogId } = req.body;
  try {
    const user = await User.findById(id);
    if(!user) return res.status(404).json({message: "user not found"})
    if (user._id.toString() === id) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { Bookmarks: blogId } },
        { new: true }
      );
      res.status(200).json({
        message: "blog added to bookmarks",
        updatedUser
      });
    }
}
catch (err) {
    next(err);
  }
};


//get user by id : 
export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
    res.status(500).json({ message: "server error" });
  }
};



