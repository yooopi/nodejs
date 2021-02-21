// Работает только с объектами и записывает в json
const fs = require("fs");
const chalk = require("chalk");

module.exports = logger = (objToWrite, path) => {
  path = `${path}.json`;
  if (typeof objToWrite !== "object")
    return console.log("Logger param should be a object!");

  objToWrite = { ...objToWrite, date: `${new Date().toLocaleString()}` };

  (async () => {
    if (!fs.existsSync(path)) {
      fs.writeFile(path, JSON.stringify([]), (err) => {
        err ? console.error(err) : console.log(`${path} created`);
      });
    }
  })().then(
    fs.readFile(path, "utf8", (err, data) => {
      if (err) throw err;
      let readedObj;
      data.length === 0 ? (readedObj = []) : (readedObj = JSON.parse(data));
      const toWrite = JSON.stringify([...readedObj, objToWrite]);
      fs.writeFile(path, toWrite, (err) => {
        err ? console.error(err) : console.log(chalk.gray("Log written"));
      });
    })
  );
};
