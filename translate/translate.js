const TOKEN =
  "t1.9euelZqekYyVzImZyYqLmZ2Mi53Gyu3rnpWalJeKjJKemZjGyJCezJuZj47l8_d7bCx--e8XfTpT_t3z9zsbKn757xd9OlP-.bN9ekrp_M5nBWdXvTjBs_bOJBLfHL9MmcxwWao4pVdVufjVh_TEkeS09U6XF_2gGnB2P6BGWL4LhiAhRATOpBA";
const FOLDER_ID = "b1gieotoupq8010scg28"; // yc iam create-token
const toTranslate = {
  folder_id: FOLDER_ID,
  texts: ["Привет", "мир"],
  targetLanguageCode: "it",
};

// AXIOS METHOD
const axios = require("axios");

axios
  .post(
    "https://translate.api.cloud.yandex.net/translate/v2/translate",
    toTranslate,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));




  







// // HTTPS METHOD
// const https = require("https");
// const options = {
//   hostname: "translate.api.cloud.yandex.net",
//   path: "/translate/v2/translate",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${TOKEN}`,
//   },
// };

// // REQUEST METHOD
// const req = https.request(options, (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   res.setEncoding("utf-8");
//   res.on("data", (chunk) => console.log(`BODY: ${chunk}`));
// });
// req.write(JSON.stringify(toTranslate));
// req.end();

// const request = require("request");
// request.post(
//   "https://translate.api.cloud.yandex.net/translate/v2/translate",
//   {
//     json: toTranslate,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   },
//   (err, res, body) => {
//     console.log("respcode: " + res.statusCode);
//     !err && res.statusCode == 200
//       ? console.log("res: ", body)
//       : console.log(err);
//   }
// );
