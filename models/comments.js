import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  body: { type: String, required: true },
  datePosted: { type: Date, required: true, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
