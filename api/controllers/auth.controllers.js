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
        const { password: passkey, ...userDetails } = user._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({ userDetails });
    }
    catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try{ 
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...userDetails } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(userDetails);
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, await bcrypt.genSalt());

            const newUser = new User({
                userName: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-3),
                email: req.body.email,
                password:  hashedPassword,
                photo: req.body.photoURL
            });

            await newUser.save();
            const token = jwt.sign({id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...userDetails } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(201).json(userDetails);
        }
    }
    catch(err) {
        next(err);
    }

}