const mysql2 = require("mysql2");
const config = require("./config");
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
  console.log(`${queries.length} rows was generated!`);
  await pool.execute(
    `INSERT INTO Users (name, email, isEmailConfirmed) VALUES ${[...queries]}`
  );
};

module.exports = async (count = 50) => {
  try {
    pool.getConnection();
    await pool.execute("DROP table Users");
    await pool.execute(
      `CREATE TABLE IF NOT EXISTS Users(id int auto_increment, name text not null, email varchar(255) not null, isEmailConfirmed boolean not null, constraint Users_pk primary key (id))`
    );
    await pool.execute(
      "create unique index Users_email_index on Users (email)"
    );
    await initRows(count);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Initial pool closed");
  }
};
