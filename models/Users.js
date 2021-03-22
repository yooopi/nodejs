const pool = require("./pool");

module.exports = {
  init: async () => {
    await pool.execute(`SET foreign_key_checks = 0`);
    await pool.execute(`DROP TABLE IF EXISTS sessions`);
    await pool.execute(`DROP TABLE IF EXISTS Users`);
    await pool.execute(`SET foreign_key_checks = 1`);
    await pool.execute(`CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT,
        googleId TEXT,
        name TEXT NOT NULL,
        email VARCHAR(255) NOT NULL,
        password TEXT NULL,
        CONSTRAINT Users_pk PRIMARY KEY (id))`);
    await pool.execute(
      `CREATE UNIQUE INDEX Users_email_index ON Users (email)`
    );
  },

  create: async (name, email, password) => {
    await pool.execute(
      `INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );
  },

  getUserByEmail: async (email) => {
    return pool
      .execute(`SELECT * FROM Users WHERE email = ?`, [email])
      .then(([res, fields]) => {
        if (res[0]) return res[0];
      })
      .catch((err) => console.error(err.message));
  },

  getUserById: async (userId) => {
    return pool
      .execute(`SELECT * FROM Users WHERE id = ?`, [userId])
      .then(([res, fields]) => {
        if (res[0]) return res[0];
      })
      .catch((err) => console.error(err.message));
  },

  findOrCreateGoogle: async (profile) => {
    const findUserById = async (id) => {
      return pool
        .execute(`SELECT * FROM Users WHERE googleId = ?`, [id])
        .then(([res, fields]) => {
          if (res[0]) return res[0];
        })
        .catch((err) => console.log(err.message));
    };
    
    const isExist = await findUserById(profile.id);

    if (isExist) {
      return isExist;
    } else {
      await pool.execute(
        `INSERT INTO Users (googleId, name, email) VALUES (?, ?, ?)`,
        [profile.id, profile.displayName, `${profile.id}@gmail.com`]
      );
      const user = await findUserById(profile.id);
      return user;
    }
  },
};
