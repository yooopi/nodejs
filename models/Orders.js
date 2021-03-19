const pool = require("./pool");

module.exports = {
  init: async () => {
    await pool.execute(`DROP TABLE IF EXISTS Orders`);
    await pool.execute(`CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT,
    userId INT NOT NULL,
    productId INT NOT NULL,
    comment TEXT NULL,
    CONSTRAINT Orders_pk
      PRIMARY KEY (id),
    CONSTRAINT Orders_Products_id_fk
      FOREIGN KEY (productId) REFERENCES Products (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT Orders_Users_id_fk
      FOREIGN KEY (userId) REFERENCES Users (id)
        ON UPDATE CASCADE ON DELETE CASCADE)`);
  },

  create: async (userId, productId, comment) => {
    await pool.execute(
      `INSERT INTO Orders (userId, productId, comment) VALUES (?, ?, ?)`,
      [userId, productId, comment]
    );
  },

  getOrders: async (userId) => {
    return pool
      .execute(`SELECT * FROM Orders where userId = ?`, [userId])
      .then(([res, fields]) => {
        return res;
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  editOrder: async (orderId, productId, comment) => {
    await pool.execute(`UPDATE Orders SET productId = ?, comment = ? WHERE id = ?`, [productId, comment, orderId])
  },

  deleteOrder: async (orderId) => {
    await pool.execute(`DELETE FROM Orders WHERE id = ?`, [orderId])
  },
};
