import User from '../Models/User.js'
import { createError } from '../error.js'


// export const updateUser = async (req, res, next) => {
//     res.staus(200).json({message: "update user"})
// }


export const redbro = async (req, res, next) => {
    if (req.params.id === req.user.id) {
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