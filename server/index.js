const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const ProfileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const database = require('./config/database.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

// db connection
database();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
);

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}));

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",ProfileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

// default route
app.get("/",(req,res)=>
{
    return res.json(
        {
            success:true,
            message:"Your Server is up and Running..."
        })
});

app.listen(PORT,()=>
{
    console.log("App is Running at Port No ",PORT);
});