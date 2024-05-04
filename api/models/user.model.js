import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    } 
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default user; //export default is used to export single value from as the default export from a file.