const mysql2 = require("mysql2");
const config = require("../configs/mysql");
const generator = require("unique-names-generator");

const pool = mysql2.createPool(config).promise();

const rowsGemerator = () => {
  const name = generator.uniqueNamesGenerator({
    dictionaries: [generator.starWars],
  });
  const email = `${name.replace(/\s+/g, "")}@starwars.com`;
  return `("${name}", "${email}", 0)`;
};

// TODO: на выходе не всегда создается count кол-во записей!
const initRows = async (count) => {
  let queries = [];
  let i = 0;
  while (i < count) {
    queries.push(rowsGemerator());
    i++;
  }
  queries = [...new Set(queries)];
  await pool.execute(
    `INSERT INTO Users (name, email, isEmailConfirmed) VALUES ${[...queries]}`
  );
  console.log(`${queries.length} rows was generated!`);
};

module.exports = async (count = 50) => {
  try {
    pool.getConnection();
    await pool.execute("DROP table Users");
    await pool.execute(
      `CREATE TABLE IF NOT EXISTS Users(
        id INT AUTO_INCREMENT,
        name TEXT NOT NULL,
        email VARCHAR(255) NOT NULL,
        isEmailConfirmed BOOLEAN NOT NULL,
        CONSTRAINT Users_pk PRIMARY KEY (id))`
    );
    await pool.execute(
      "CREATE UNIQUE INDEX Users_email_index ON Users (email)"
    );
    await initRows(count);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
    console.log("Initial pool was closed\n");
  }
};
