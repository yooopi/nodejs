const axios = require("axios");
var cheerio = require("cheerio");
var newsSelector = `.post__title_link`;

axios
  .get("https://habr.com/ru/news/")
  .then((res) => {
    const $ = cheerio.load(res.data);
    $(newsSelector).each(function (i, elem) {
      console.log($(this).text());
    });
  })
  .catch((err) => console.log(`Error: ${err}`));
