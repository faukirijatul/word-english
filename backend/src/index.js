import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

import wordRouter from './routes/word.route.js';
import connectDB from './database/database.js';
app.use('/words', wordRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
