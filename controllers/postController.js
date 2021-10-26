import Post from '../models/posts';

export const get = async (req, res) => {
  const posts = await Post.find({}, 'title body datePosted author').sort({
    datePosted: -1,
  });
  res.json({ posts });
};
