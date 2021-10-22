import mongoose from 'mongoose';
const Schema = mongoose.schema();

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: STring, required: true },
});
