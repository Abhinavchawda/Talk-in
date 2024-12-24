import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { server, app } from './socketIO/server.js';

dotenv.config();
app.use(cookieParser());

// Allow requests from specific origins
app.use(cors({
  origin: "http://localhost:5173", // Your React app's URL
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
}));


app.use(express.json()); // to parse req.body

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"

app.use("/user", userRoute);
app.use("/message", messageRoute);

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

server.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})