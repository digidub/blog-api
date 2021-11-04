import Post from '../models/posts';
import User from '../models/users';

export const get = async (req, res) => {
  try {
    const posts = await Post.find({}, 'title body datePosted author published')
      .sort({
        datePosted: -1,
      })
      .populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
};

export const getID = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);
    res.json(post);
  } catch (err) {
    res.json(err);
  }
};

export const post = async (req, res) => {
  try {
    const author = await User.findOne({ username: req.user.username });
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      author: author._id,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const existingPost = await Post.findById(req.params.postID);
    if (!existingPost) {
      return post(req, res);
    }
    existingPost.title = req.body.title ? req.body.title : existingPost.title;
    existingPost.body = req.body.body ? req.body.body : existingPost.body;
    existingPost.dateEdited = Date.now();
    existingPost.published = req.body.published
      ? req.body.published
      : existingPost.published;
    existingPost.save();
    res.json(existingPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const remove = async (req, res) => {
  Post.findByIdAndDelete(req.params.postID, (err) => {
    if (err) res.json(err);
    res.json(req.params.postID);
  });
};
