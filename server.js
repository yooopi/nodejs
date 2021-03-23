const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const sessionCfg = require("./configs/session");
const hbsHelpers = require("./views/helpers");
const models = require("./models");
const controllers = require("./controllers");
const cookieParser = require("cookie-parser");
// models.init();

// config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbsHelpers();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
const config = require("./configs/mysql");
const sessionStore = new MySQLStore(config);
const sessionMiddleware = session({ ...sessionCfg, store: sessionStore });
app.use(sessionMiddleware);

// socket.io
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
  if (!socket.request.session.userName) {
    console.error("Unauthorised user connected!");
    socket.disconnect();
    return;
  }

  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
  });

  console.log(`userId = ${socket.request.session.userId} connected`);

  socket.on("disconnect", () => {
    console.log(`userId = ${socket.request.session.userId} disconnected`);
  });

  socket.on("chatMessage", (data) => {
    models.ChatsMessages.create(
      data.chatId,
      socket.request.session.userId,
      data.message
    );
    data.author = socket.request.session.userName;
    console.log("chat id from joinRoom: ", data.chatId)
    io.to(data.chatId).emit("chatMessage", data);
  });
});

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

http.listen(8080, () => {
  console.log(`Server started at http://localhost:8080`);
});
