import Comment from '../models/comments';
import { body, validationResult } from 'express-validator';

export const get = async (req, res, next) => {
  const postID = req.params.postID;
  console.log(req.params);
  const comments = await Comment.find({ post: postID });
  res.json(comments);
};

export const post = [
  body('username', 'Username must not be empty')
    .isLength({ min: 3, max: 10 })
    .escape(),
  body('email', 'Please enter valid email address').normalizeEmail().isEmail(),
  body('body', 'Please enter a post').isLength({ min: 1, max: 1000 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const newComment = new Comment({
      username: req.body.username,
      email: req.body.email,
      body: req.body.body,
      post: req.params.postID,
    });
    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      await newComment.save();
      res.json(newComment);
    }
  },
];
