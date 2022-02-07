import { Status } from './constants.js';

function compareLetters(guess, correct, correctWord) {
  if (guess === correct) return Status.Correct;
  if (correctWord.includes(guess)) return Status.Present;
  return Status.Absent;
}

export function checkWord(guess, correctWord) {
  const guessLetters = guess.split('');
  const correctLetters = correctWord.split('');
  const result = [];

  for (let index = 0; index < guessLetters.length; index++) {
    result.push({
      letter: guessLetters[index],
      result: compareLetters(guessLetters[index], correctLetters[index], correctWord),
    });
  }

  return result;
}
