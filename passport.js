import 'dotenv/config';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/users';
import bcrypt from 'bcryptjs';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

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

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    function cookieExtractor(req) {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
      }
      return token;
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload.user._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate('jwt', { session: false });
