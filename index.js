const mysql2 = require("mysql2");
const config = require("./config");
const initUsersTable = require("./initUsersTable");
const connection = mysql2.createPool(config);
const init = require("./initUsersTable");

const pool = mysql2.createPool(config).promise();

const Users = {
  create: async (name, email) => {
    pool
      .execute(
        `INSERT INTO Users (name, email, isEmailConfirmed) VALUES (?, ?, ?)`,
        [name, email, 0]
      )
      .then((res) => {
        console.log(`Row was created with id ${res[0]["insertId"]}`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  searchByName: async (name) => {
    pool
      .execute(`SELECT * FROM Users WHERE name like ?`, [`%${name}%`])
      .then((res) => {
        console.log(`Was found ${res[0].length} rows`);
        pool.end();
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  confirmEmail: async (id, isEmailConfirmed) => {
    pool
      .execute(`UPDATE Users SET isEmailConfirmed = ? WHERE id = ?`, [
        isEmailConfirmed,
        id,
      ])
      .then((res) => {
        if (res) {
          console.log(
            `Email was ${isEmailConfirmed == 1 ? "confirmed" : "unconfirmed"}`
          );
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  delete: async (id) => {
    pool
      .execute(`DELETE FROM Users WHERE id = ?`, [id])
      .then((res) => {
        if (res) console.log(`Row with id ${id} was deleted`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  },
};

(async () => {
  await initUsersTable(30);
  Users.create("Jedi Master Vasak", "yooopi.av@gmail.com");
  Users.searchByName("Darth");
  Users.confirmEmail(4, 0);
  Users.delete(6);
})();
