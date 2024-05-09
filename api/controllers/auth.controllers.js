import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, await bcrypt.genSalt());
    const newUser = new User({userName, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json('User Created successfully!');
    }
    catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)  return next(errorHandler(404, 'User not found'));
        const pass = bcrypt.compareSync(password, user.password);
        if (!pass) return next(401, 'invalid credentials');
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
        console.log('singin true');
        console.log(user._doc);
        const { password: passkey, ...userDetails } = user._doc;
        res
            .cookie('token', token, { httpOnly: true  })
            .status(200)
            .json({ userDetails });
    }
    catch (error) {
        next(error);
    }
}