import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      //pass the whole request data to URL
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
        console.log(accessToken);
      return done(null, {accessToken, profile});
    }
  )
);

//It will store the 'user' data in session (gets stored in cookies).
passport.serializeUser(function (user, done) {
  done(null, user);
});

//Then for further requests 'user' (stored in session) will be deserialised and will be sent in the further requests, and can be accessed by req.user.
passport.deserializeUser(function (user, done) {
  done(null, user);
});
