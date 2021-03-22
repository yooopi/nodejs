const pool = require("./pool");

module.exports = {
  init: async () => {
    await pool.execute(`SET foreign_key_checks = 0`);
    await pool.execute(`DROP TABLE IF EXISTS ChatsMessages`);
    await pool.execute(`SET foreign_key_checks = 1`);
    await pool.execute(`CREATE TABLE IF NOT EXISTS ChatsMessages (
    id INT AUTO_INCREMENT,
    chatId INT NOT NULL,
    userId INT NOT NULL,
    message TEXT NOT NULL,
    CONSTRAINT ChatsMessages_pk
      PRIMARY KEY (id),
    CONSTRAINT ChatsMessages_Chats_id_fk
      FOREIGN KEY (chatId) REFERENCES Chats (id)
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT ChatsMessages_Users_id_fk
      FOREIGN KEY (userId) REFERENCES Users (id)
      ON UPDATE CASCADE ON DELETE CASCADE)`);
  },

  create: async (chatId, userId, message = "") => {
    return await pool.execute(
      `INSERT INTO ChatsMessages (chatId, userId, message) VALUES (?, ?, ?)`,
      [chatId, userId, message]
    );
  },

  getMessages: async (chatId) => {
    return await pool
      .execute(
        `SELECT ChatsMessages.*, Users.name FROM ChatsMessages
      LEFT JOIN Users
      on Users.id = ChatsMessages.userId
      WHERE chatId = ?`,
        [chatId]
      )
      .then(([res, fields]) => {
        return res;
      })
      .catch((err) => {
        console.error(err.message);
      });
  },
};
