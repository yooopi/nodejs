const minimist = require("minimist");
const readline = require("readline");
const game = require("./game");
const logger = require("./logger");
const chalk = require("chalk");

const arguments = minimist(process.argv.slice(2), {
  alias: {
    log: "l",
  },
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const renderGameResult = (res) => {
  console.log(
    chalk.blueBright(
      `Bot showed a ${res.bot}. ${
        res.playerScore === 1
          ? "You win!"
          : res.playerScore === -1
          ? "You lost :("
          : "Draw..."
      }`
    )
  );
};

function run(arguments) {
  rl.on("line", (line) => {
    game(line)
      .then((res) => {
        logger(res, arguments.log);
        return res;
      })
      .then((res) => renderGameResult(res));
  });
}

run(arguments);
