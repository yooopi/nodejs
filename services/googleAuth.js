const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "669244713430-cdq8v3q3p7qm4tucb4s2cnnt4k9achc6.apps.googleusercontent.com",
      clientSecret: "JdMT7zIbJoJIk-Nsp-MRnvaE",
      callbackURL: "http://localhost:8080/",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());
