const { Chess } = require("chess.js");
const ascii = require("ascii");
const chalk = require("chalk");

const run = () => {
  const chess = new Chess();
  const renderTurn = () => {
    console.clear();
    console.log(chalk.bold(chess.ascii()));
    console.log(
      chalk.bold(chess.turn() === "b" ? "Black's turn" : "White's turn")
    );
    console.log(
      chalk.blueBright(chess.pgn({ max_width: 12, newline_char: "\n" }))
    );
  };

  renderTurn();
  process.stdin.setEncoding("utf-8").on("data", (data) => {
    if (!chess.moves().includes(data.trim())) {
      renderTurn();
      console.log(
        chalk.red(
          `Wrong move!\nPlease, choose on of: ${chess.moves().toString()}`
        )
      );
    } else {
      chess.move(data.trim());
      renderTurn();
    }
  });
};

run();
