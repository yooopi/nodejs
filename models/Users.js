const pool = require("./pool");

module.exports = {
  create: async (name, email) => {
    return pool
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
    return pool
      .execute(`SELECT * FROM Users WHERE name like ?`, [`%${name}%`])
      .then((res) => {
        console.log(`Was found ${res[0].length} rows`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  confirmEmail: async (id, isEmailConfirmed) => {
    return pool
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
    return pool
      .execute(`DELETE FROM Users WHERE id = ?`, [id])
      .then((res) => {
        if (res) console.log(`Row with id ${id} was deleted`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  },
};
