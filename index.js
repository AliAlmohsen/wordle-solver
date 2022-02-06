const { emojiConsole, chalkConsole } = require("./console-result");
const { checkWord } = require("./check-word");
const { getBestWord } = require("./get-words");

const correctWord = process.argv[2];

const guesses = [];
for (let guessIndex = 0; guessIndex < 6; guessIndex++) {
  const word = getBestWord(guesses);
  const result = checkWord(word, correctWord);
  guesses.push(result);
  if (!result.some((letter) => letter.result !== "g")) break;
}

guesses.forEach((guess) => {
  chalkConsole(guess);
});
guesses.forEach((guess) => {
  emojiConsole(guess);
});
