import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/users';

passport.use(
  new LocalStrategy(
    {
      username: 'username',
      password: 'password',
    },
    function (username, password, cb) {
      return User.findOne({ username, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, {
              message: 'Incorrect username or password.',
            });
          }

          return cb(null, user, { message: 'Logged In Successfully' });
        })
        .catch((err) => cb(err));
    }
  )
);

export default passport;
