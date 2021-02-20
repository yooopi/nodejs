// Работает только с объектами, что плохо
const fs = require("fs");

let objToWrite = {aaa: "a", b: 1} // хотел получать этот объект из game.js

const formatData = (data) => {
  return {...data, date: `${new Date()}`}
};

objToWrite = formatData(objToWrite)
fs.readFile("log.json", 'utf8', (err, data) => {
  if (err) throw err
  let readedObj
  data.length === 0 ? readedObj = [] : readedObj = JSON.parse(data)
  const toWrite = JSON.stringify([...readedObj, objToWrite])
  
  fs.writeFile("log.json", toWrite, (err) => {
        err ? console.error(err) : console.log("Written");
      });
});

  module.exports = logger = () => {
  }