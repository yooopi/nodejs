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
  },

  getProducts: async () => {},
};
