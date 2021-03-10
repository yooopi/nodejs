const Users = require("./Users");
const Products = require("./Products");
const Orders = require("./Orders");

const init = async () => {
  try {
    await Users.init();
    await Products.init();
    await Orders.init();
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log("Database initialized");
  }
};

module.exports = {
  Users,
  Products,
  Orders,
  init,
};
