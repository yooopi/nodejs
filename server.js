const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const sessionCfg = require("./configs/session");
const hbsHelpers = require("./views/helpers");

// config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbsHelpers();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(session(sessionCfg));

// router
const router = require("./routers");
app.use(router);

app.listen(8080, () => {
  console.log(`Server started at http://localhost:8080`);
});
