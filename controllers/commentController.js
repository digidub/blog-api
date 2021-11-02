import Comment from '../models/comments';
import { body, validationResult } from 'express-validator';

export const get = async (req, res) => {
  try {
    const postID = req.params.postID;
    const comments = await Comment.find({ post: postID });
    res.json(comments);
  } catch (err) {
    res.json(err);
  }
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

export const remove = async (req, res) => {
  Comment.findByIdAndDelete(req.params.commentID, (err) => {
    if (err) res.json(err);
    res.json({ 'deleted comment': req.params.commentID });
  });
};
