import Post from '../models/posts';
import User from '../models/users';

export const get = async (req, res) => {
  const posts = await Post.find({}, 'title body datePosted author')
    .sort({
      datePosted: -1,
    })
    .populate('author', 'username');
  res.json({ posts });
};

export const getID = async (req, res) => {
  const post = await Post.findById(req.params.postID);
  res.json({ post });
};

export const post = async (req, res) => {
  const author = await User.findOne({ username: req.user.username });
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    author: author._id,
  });
  await newPost.save();
  res.json(newPost);
};

export const update = async (req, res) => {
  const post = await Post.findById(req.params.postID);
  post.title = req.body.title;
  post.body = req.body.body;
  post.dateEdited = Date.now();
  post.save();
  res.json({ updated: post });
};

export const remove = async (req, res) => {
  const post = await Post.findById(req.params.postID);
  await Post.findByIdAndDelete(post._id, (err) => {
    if (err) res.json(err);
    res.json({ deleted: post });
  });
};
