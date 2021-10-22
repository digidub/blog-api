import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.get('/', (req, res) => {
  res.send('Received HTTP Get');
});

app.post('/', (req, res) => {
  res.send('Received HTTP Post');
});

app.put('/users/:id', (req, res) => {
  res.send(`Received HTTP Put for user id ${req.params.id}`);
});

app.delete(`/users/:id`, (req, res) => {
  res.send(`Received HTTP Delete for user id ${req.params.id}`);
});

app.listen(3000, () => console.log('App listening on port 3000'));
