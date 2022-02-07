import { emojiConsole, chalkConsole } from "./console-result.js";
import { checkWord } from "./check-word.js";
import { getBestWord } from "./get-words.js";
import { Status } from "./constants.js";

const correctWord = process.argv[2];

const guesses = [];
for (let guessIndex = 0; guessIndex < 6; guessIndex++) {
  const word = getBestWord(guesses);
  const result = checkWord(word, correctWord);
  guesses.push(result);
  if (!result.some((letter) => letter.result !== Status.Present)) break;
}

guesses.forEach((guess) => {
  chalkConsole(guess);
});
guesses.forEach((guess) => {
  emojiConsole(guess);
});
