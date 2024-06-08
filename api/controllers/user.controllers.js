import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "Hello part 2",
  });
};

export const updateUserInfo = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "Unauthorized"));
    }

    if (req.body.password) req.body.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true }
    );
    const { password, ...userDetails } = updatedUser._doc;
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};
