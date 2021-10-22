import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(cors());

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

app.post('/users', verifyToken, (req, res) => {
  res.send('Received HTTP Get');
});

app.post('/user/login', async (req, res) => {
  const user = { id: 1, username: 'mike' };
  const token = jwt.sign({ user }, 'secretkey');

  res.json({ token });
});

app.put('/users/:id', (req, res) => {
  res.send(`Received HTTP Put for user id ${req.params.id}`);
});

app.delete(`/users/:id`, (req, res) => {
  res.send(`Received HTTP Delete for user id ${req.params.id}`);
});

app.listen(3000, () => console.log('App listening on port 3000'));
