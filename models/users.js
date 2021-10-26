import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// UserSchema.pre('save', (next) => {
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.hash(user.password, 10).then((hashedPassword) => {
//     user.password = hashedPassword;
//     next();
//   });
// });

// UserSchema.methods.comparePassword = function (password, next) {
//   bcrypt.compare(password, this.password, function (err, isMatch) {
//     if (err) return next(err);
//     next(null, isMatch);
//   });
// };

const User = mongoose.model('User', UserSchema);

export default User;
