require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://mern-app-1-e29v.onrender.com']
}));
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

mongoose.connect(process.env.URI).then(() => {
  console.log("connected successfully");

  app.listen(process.env.PORT || 8000, (error) => {
    if (error) console.log(error);
    console.log("connected successfully at", process.env.PORT);
  });
}).catch((error) => {
  console.error('error', error);
});