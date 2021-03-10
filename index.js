const pool = require("./models/pool");
const initUsersTable = require("./models/initUsersTable");
const Users = require("./models/Users");

const app = async () => {
  try {
    await initUsersTable(30);
    await Users.create("Jedi Master Vasak", "yooopi.av@gmail.com");
    await Users.searchByName("Darth");
    await Users.confirmEmail(4, 0);
    await Users.delete(6);
  } catch (err) {
    console.error(err.message);
  } finally {
    pool.end();
  }
};

app();
