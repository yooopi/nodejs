const pool = require("./models/pool");
const models = require("./models");

const app = async () => {
  try {
    await models.Users.init();
    await models.Products.init();
    await models.Orders.init();
  } catch (err) {
    console.error(err.message);
  } finally {
    pool.end();
  }
};

app();
