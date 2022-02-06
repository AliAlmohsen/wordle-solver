import chalk from "chalk";

export function chalkConsole(guess) {
  let result = "";
  guess.forEach((guessedLetter) => {
    switch (guessedLetter.result) {
      case "g":
        result += chalk.bgGreen(" " + guessedLetter.letter.toUpperCase() + " ");
        break;
      case "b":
        result += chalk.whiteBright.bgBlack(
          " " + guessedLetter.letter.toUpperCase() + " "
        );
        break;
      case "y":
        result += chalk.bgYellow(
          " " + guessedLetter.letter.toUpperCase() + " "
        );
        break;

      default:
        result += guessedLetter;
    }
  });
  console.log(result);
}

export function emojiConsole(guess) {
  let result = "";
  guess.forEach((guessedLetter) => {
    switch (guessedLetter.result) {
      case "g":
        result += "🟩 ";
        break;
      case "b":
        result += "⬜ ";
        break;
      case "y":
        result += "🟨 ";
        break;

      default:
        result += guessedLetter;
    }
  });
  console.log(result);
}
