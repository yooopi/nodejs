const minimist = require("minimist");
const readline = require("readline");
const game = require("./game");

let arguments = minimist(process.argv.slice(2), {
  alias: {
    log: "l",
    dev: "d",
  },
  boolean: ["dev"],
});

if (arguments.dev || arguments.log) {
  console.log("lol");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function test() {
  rl.on("line", (line) => {
    game(line).then(
      (res) => console.log(res),
      (err) => new Error()
    );
  });
}

test();