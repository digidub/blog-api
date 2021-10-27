import 'dotenv/config';
import bcrypt from 'bcryptjs';
import User from '../models/users';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      return res.json(newUser);
    });
  });
};

export const login = async (req, res, next) => {
  const user = req.user;
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  return res.json({ user, token });
};
