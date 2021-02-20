// Наверное, стоило сделать обработку любого типа данных
const fs = require("fs");

// module.exports = logger = (obj) => {

// }

const addDateToData = (data) => {
  return [{ data: data, date: new Date() }];
};

const logger = (data, fileName) => {
  data = JSON.stringify(addDateToData(data));
  console.log(JSON.parse(data).date);
  fs.appendFile(fileName, data, (err) => {
    err ? console.error(err) : console.log("Written");
  });
};

logger(`data111222`, "kek.json");
