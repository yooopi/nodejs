const axios = require("axios");
const TOKEN =
  "t1.9euelZrOj5SaisbGiorGjpOcz8eJi-3rnpWalJeKjJKemZjGyJCezJuZj47l8_d0Qyt--e9nHAot_d3z9zRyKH7572ccCi39.DSfE4iARh9t1O7CG0_oUh81AQGihSV70Fqr7g-hiKU74Oz-znd9zoEG6flG-_JGvGhMybIepiipZjYcwBlA3AQ";
const FOLDER_ID = "b1gieotoupq8010scg28"; // generated by `yc iam create-token`

module.exports = async (text, targetLanguageCode) => {
  try {
    const res = await axios.post(
      "https://translate.api.cloud.yandex.net/translate/v2/translate",
      {
        folder_id: FOLDER_ID,
        texts: text,
        targetLanguageCode: targetLanguageCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};
