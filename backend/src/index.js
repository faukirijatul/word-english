import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

import wordRouter from './routes/word.route.js';
app.use('/words', wordRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
