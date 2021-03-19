const pool = require("./pool");

module.exports = {
  init: async () => {
    await pool.execute(`SET foreign_key_checks = 0`);
    await pool.execute(`DROP TABLE IF EXISTS Products`);
    await pool.execute(`SET foreign_key_checks = 1`);
    await pool.execute(`CREATE TABLE IF NOT EXISTS Products (
      id INT AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      CONSTRAINT Product_pk
        PRIMARY KEY (id))`);
    await pool.execute(
      `INSERT INTO Products (name) VALUES ("pizza"), ("cheeseburger"), ("chicken wings"), ("hot dog")`
    );
  },

  getProducts: async () => {
    return pool
      .execute(`SELECT * FROM Products`)
      .then(([res, fields]) => {
        return res;
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  findById: async (productId) => {
    return pool
      .execute(`SELECT * FROM Products WHERE id = ?`, [productId])
      .then(([res, fields]) => {
        if (res[0]) return res[0];
      })
      .catch((err) => console.error(err.message));
  },
};
