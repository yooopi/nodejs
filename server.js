const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const sessionCfg = require("./configs/session");
const hbsHelpers = require("./views/helpers");
const models = require("./models");
const cookieParser = require("cookie-parser");
models.init();

// config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbsHelpers();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
const config = require("./configs/mysql");
const sessionStore = new MySQLStore(config);
app.use(session({ ...sessionCfg, store: sessionStore }));

// router
const router = require("./routers");
app.use(router);

// // Google auth
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: "669244713430-cdq8v3q3p7qm4tucb4s2cnnt4k9achc6.apps.googleusercontent.com",
//       clientSecret: "JdMT7zIbJoJIk-Nsp-MRnvaE",
//       callbackURL: "http://localhost:8080/",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Найди или создай юзера
//       // По итогу верни done(err, user || false)
//       User.findOrCreate({ googleId: profile.id }, (err, user) => {
//         return done(err, user);
//       });
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// app.use(passport.initialize());
// app.use(passport.session());

// START APP

app.listen(8080, () => {
  console.log(`Server started at http://localhost:8080`);
});
