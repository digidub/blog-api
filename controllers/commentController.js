import Comment from '../models/comments';

export const get = async (req, res, next) => {
  const postID = req.params.postID;
  console.log(req.params);
  const comments = await Comment.find({ post: postID });
  res.json(comments);
};
