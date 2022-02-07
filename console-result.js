import chalk from "chalk";

import { Status } from "./constants.js";

export function chalkConsole(guess) {
  let result = "";
  guess.forEach((guessedLetter) => {
    switch (guessedLetter.result) {
      case Status.Correct:
        result += chalk.bgGreen(" " + guessedLetter.letter.toUpperCase() + " ");
        break;
      case Status.Absent:
        result += chalk.whiteBright.bgBlack(
          " " + guessedLetter.letter.toUpperCase() + " "
        );
        break;
      case Status.Present:
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
      case Status.Correct:
        result += "🟩 ";
        break;
      case Status.Absent:
        result += "⬜ ";
        break;
      case Status.Present:
        result += "🟨 ";
        break;

      default:
        result += guessedLetter;
    }
  });
  console.log(result);
}
