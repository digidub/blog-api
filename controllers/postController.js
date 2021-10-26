import Post from '../models/posts';

export const get = async (req, res) => {
  const posts = await Post.find({}, 'title body datePosted author')
    .sort({
      datePosted: -1,
    })
    .populate('author', 'username');
  res.json({ posts });
};

export const post = async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  });
  await newPost.save();
  res.json(newPost);
};
