const shapes = ["rock", "paper", "scissor"];
const score = {
  draw: 0,
  player: 1,
  bot: -1,
};

const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const calcWinner = (player, bot) => {
  if (player === bot) {
    return score.draw;
  }

  let result;
  switch (player) {
    case "rock":
      bot === "paper" ? (result = score.bot) : (result = score.player);
      break;
    case "paper":
      bot === "scissor" ? (result = score.bot) : (result = score.player);
      break;
    case "scissor":
      bot === "rock" ? (result = score.bot) : (result = score.player);
      break;
  }
  return result;
};

module.exports = game = (player) => {
  return new Promise((resolve, reject) => {
    const bot = getRandom(shapes);
    if (!shapes.includes(player)) {
      reject(console.error("Invalid value! Type on of: rock, paper, scissor"));
    }

    resolve([{
      player: player,
      bot: bot,
      playerScore: calcWinner(player, bot),
    }]);
  });
};
