import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/auth', routes.auth);
app.use('/posts', routes.post);
app.use('/posts/:postID/comments', routes.comment);

app.listen(3000, () => console.log('App listening on port 3000'));
