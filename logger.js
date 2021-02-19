// module.exports = logger = (obj) => {

// }

const fs = require("fs");

const changeData = () => {
  const createdAt = new Date();
  const logDate = `${createdAt.getDate()}.${
    createdAt.getMonth() + 1
  }.${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  return logDate;
};

const logger = (data, fileName) => {
  changeData();
  fs.appendFile(fileName, data, (err) => {
    err ? console.error(err) : console.log("Written");
  });
};

logger(`${changeData()} data111222\n`, "kek.txt");
