const pool = require("./pool");

module.exports = {
  init: async () => {
    await pool.execute(`SET foreign_key_checks = 0`);
    await pool.execute(`DROP TABLE IF EXISTS Users`);
    await pool.execute(`SET foreign_key_checks = 1`);
    await pool.execute(`CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT,
        name TEXT NOT NULL,
        email VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        isEmailConfirmed BOOLEAN NOT NULL,
        CONSTRAINT Users_pk PRIMARY KEY (id))`);
    await pool.execute(
      `CREATE UNIQUE INDEX Users_email_index ON Users (email)`
    );
  },

  create: async (name, email, password) => {
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
};
