const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const handlebars = require("handlebars");
const templating = require("consolidate");
const news = require("./news");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("hbs", templating.handlebars);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));
templating.requires.handlebars = handlebars;

templating.requires.handlebars.registerHelper("selected", (data, value) => {
  if (data === value) return "selected";
});

app.get("/", (req, res) => {
  req.cookies.source
    ? res.render("index.hbs", {
        news: req.cookies.news,
        source: req.cookies.source,
        count: req.cookies.count,
      })
    : res.render("index.hbs");
});

app.post("/news", async (req, res) => {
  const source = req.body.source;
  const count = req.body.count;
  const reqNews = await news(source, count);

  res.cookie("source", source);
  res.cookie("count", count);
  res.cookie("news", reqNews);
  res.render("index.hbs", {
    news: reqNews,
    source: source,
    count: count,
  });
});

app.listen(8080, () => console.log("Listening on port https://localhost:8080"));
