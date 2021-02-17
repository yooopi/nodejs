// const minimist = require("minimist");

// let arguments = minimist(process.argv.slice(2), {
//   alias: {
//     help: "h",
//     test: "t",
//   },
//   boolean: ["lol"],
// });

// console.log(arguments);
const Sugar = require("sugar");
const shapes = ["rock", "paper", "scissor"];

const duel = (user, bot) => {
  if (user === bot) {
    console.log("Draw!");
    return "Draw";
  }

  switch (user) {
    case "rock":
      bot === "paper" ? console.log("User lost :(") : console.log("User win!");
      break;

    case "paper":
      bot === "scissor"
        ? console.log("User lost :(")
        : console.log("User win!");
      break;

    case "scissor":
      bot === "rock" ? console.log("User lost :(") : console.log("User win!");
      break;
  }
};

const game = () => {
  let bot = Sugar.Array.sample(shapes);
  let user = Sugar.Array.sample(shapes);
  duel(user, bot);
};

game();
