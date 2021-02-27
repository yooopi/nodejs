const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("handlebars");
const templating = require("consolidate");
const translate = require("./translate");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", templating.handlebars);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.post("/translate", async (req, res) => {
  const yres = await translate(req.body.texts, req.body.targetLanguageCode);
  res.render("index.hbs", { translation: yres.data.translations[0].text });
});

app.listen(8080, () => console.log("Listening on port https://localhost:8080"));
