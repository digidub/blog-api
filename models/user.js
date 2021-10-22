import mongoose from 'mongoose';
const Schema = mongoose.schema();

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('Post', PostSchema);
