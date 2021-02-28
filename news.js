const axios = require("axios");
const cheerio = require("cheerio");

const data = {
  habr: {
    url: "https://habr.com/ru/news/",
    selector: ".post__title_link",
  },
  "3dnews": {
    url: "https://3dnews.ru/",
    selector:
      "#allnews > div.allnews-col.rncol > div.content-block-data.white > ul > li > a",
  },
  navalny: {
    url: "https://navalny.com/",
    selector:
      "body > div.b-page.b-layout > div > div > div > div.l-grid__item.nine-twelfths > div > div > div > h2 > a",
  },
};

module.exports = async (source, count) => {
  const res = await axios
    .get(data[source].url)
    .then((res) => {
      const news = [];
      const $ = cheerio.load(res.data);
      $(data[source].selector).each(function (i, elem) {
        news.push($(this).text());
      });

      return news.splice(0, count);
    })
    .catch((err) => console.log(`Error: ${err}`));
  return res;
};
