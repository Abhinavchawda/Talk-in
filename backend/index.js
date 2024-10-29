import express from 'express';
const app = express();

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})