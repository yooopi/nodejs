const pool = require("./pool");

module.exports = {
  init: async () => {
    await pool.execute(`SET foreign_key_checks = 0`);
    await pool.execute(`DROP TABLE IF EXISTS Chats`);
    await pool.execute(`SET foreign_key_checks = 0`);
    await pool.execute(`CREATE TABLE IF NOT EXISTS Chats (
    id INT AUTO_INCREMENT,
    name TEXT NOT NULL,
    CONSTRAINT Chats_pk
      PRIMARY KEY (id))`);
  },

  create: async (chatName) => {
    return await pool.execute(`INSERT INTO Chats (name) VALUES (?)`, [
      chatName,
    ]);
  },

  getChatsList: async () => {
    return await pool
      .execute(`SELECT * FROM Chats`)
      .then(([res, fields]) => {
        return res;
      })
      .catch((err) => {
        console.error(err.message);
      });
  },
};
