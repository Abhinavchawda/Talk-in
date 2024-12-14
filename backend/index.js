import express from 'express';
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import cors from "cors";
// Allow requests from specific origins
app.use(cors({
  origin: "http://localhost:5173", // Your React app's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
}));

import mongoose from 'mongoose';

import userRoute from "./routes/user.route.js";

app.use(express.json()); // to parse req.body

app.use("/user", userRoute);


const port = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("DB connected");
} catch (error) {
    console.log("ERROR in DB connenction in index.js : ");
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})