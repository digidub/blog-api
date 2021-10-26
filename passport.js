import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/users';
import bcrypt from 'bcryptjs';

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'User Authentication Failed' });
        }
      });
    });
  })
);

export const authLocal = passport.authenticate('local', {
  session: false,
});
