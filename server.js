const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const sessionCfg = require("./configs/session");
const hbsHelpers = require("./views/helpers");
const models = require("./models");
const cookieParser = require('cookie-parser');
models.init();

// config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbsHelpers();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser())
const config = require("./configs/mysql");
const sessionStore = new MySQLStore(config);
app.use(session({ ...sessionCfg, store: sessionStore }));

// router
const router = require("./routers");
app.use(router);

app.listen(8080, () => {
  console.log(`Server started at http://localhost:8080`);
});
