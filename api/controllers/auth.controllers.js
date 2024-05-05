import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

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