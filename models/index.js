const Users = require("./Users");
const Products = require("./Products");
const Orders = require("./Orders");
const Chats = require("./Chats");
const ChatsMessages = require("./ChatsMessages");

const init = async () => {
  try {
    await Users.init();
    await Products.init();
    await Orders.init();
    await Chats.init();
    await ChatsMessages.init();
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
  Chats,
  ChatsMessages,
  init,
};
