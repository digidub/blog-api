import { Router } from 'express';
const router = Router();
import { verifyToken } from '../verifyToken';
import jwt from 'jsonwebtoken';

router.post('/users', verifyToken, async (req, res) => {
  const authData = await jwt.verify(req.token, 'secretkey');
  res.json({ message: 'Received HTTP Get', authData });
});

//   app.post('/users/:id', verifyToken, async (req, res) => {
//     const authData = await jwt.verify(req.token, 'secretkey');
//     res.json({ message: 'Received HTTP Get', authData });
//   });

//   app.post('/user/login', async (req, res) => {
//     const user = { id: 1, username: 'mike' };
//     const token = jwt.sign({ user }, 'secretkey');

//     res.json({ token });
//   });

//   app.put('/users/:id', (req, res) => {
//     res.send(`Received HTTP Put for user id ${req.params.id}`);
//   });

//   app.delete(`/users/:id`, (req, res) => {
//     res.send(`Received HTTP Delete for user id ${req.params.id}`);
//   });

export default router;
