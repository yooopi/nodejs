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
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
const config = require("./configs/mysql");
const sessionStore = new MySQLStore(config);
app.use(session({ ...sessionCfg, store: sessionStore }));

// ************** Google auth **************
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleOath20Config = require("./configs/googleOauth20");
passport.use(
  new GoogleStrategy(
    googleOath20Config,
    async (accessToken, refreshToken, profile, done) => {
      const user = await models.Users.findOrCreateGoogle(profile);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());
// ************** Google auth **************

// router
const router = require("./routers");
app.use(router);

// START APP

app.listen(8080, () => {
  console.log(`Server started at http://localhost:8080`);
});
