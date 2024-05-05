import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB).then(() => {
    app.listen(3000,  () => {
        console.log('application live on port 3000')
    })
}).catch((err) => {
    console.log(err);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});