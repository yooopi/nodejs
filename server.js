const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("handlebars");
const templating = require("consolidate");
const news = require("./news");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", templating.handlebars);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.post("/news", async (req, res) => {
  console.log(req.body.resource);
  const reqNews = await news(req.body.resource);
  res.render("index.hbs", { reqNews: reqNews });
});

app.listen(8080, () => console.log("Listening on port https://localhost:8080"));
