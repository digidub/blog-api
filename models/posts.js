import mongoose from 'mongoose';
const Schema = mongoose.schema();

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  datePosted: { type: Date, required: true, default: Date.now },
  dateEdited: { type: Date, required: false },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, default: false },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
