const express = require("express");
const app = express();
const path = require("path");
const translate = require("./translate");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/translate", async (req, res) => {
  const yres = await translate(req.body.texts, req.body.targetLanguageCode);
  console.log(`RESPONSE: ${yres.data.translations}`);
  // Такой шаблон не лучший вариант, но быстрый
  res.send(`<form method="POST" action="/translate">
  <input name="texts" type="text" />
  <select name="targetLanguageCode">
    <option value="en">en</option>
    <option value="it">it</option>
    <option value="es">es</option>
    <option value="de">de</option>
    <option value="fr">fr</option>
  </select>
  <button type="submit">SEND</button>
</form>
<p>Target language was: ${req.body.targetLanguageCode}</p>
<h3>${yres.data.translations[0].text}</h3>
<script></script>`);
});

app.listen(8080, () => console.log("Listening on port https://localhost:8080"));
