const fs = require("fs");
const data1 = [
  {
    player: "player",
    bot: "bot",
    playerScore: 1,
  },
];

const lol = fs.readFile("kek.json", (err, data) => {
  if (err) throw err;
  const objFromLog = JSON.parse(data);
  const newData = [...objFromLog, ...data1];
  console.log(JSON.stringify(newData));
  return JSON.stringify(newData);
});

// fs.writeFile("kek.json", lol, (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });
