import fs from 'fs';
import path from 'path';

import { Status } from './constants.js';

function getWords() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'words.json'), 'utf8'));
}

export const words = getWords();

function getLetterFrequencies(withVowels) {
  const letters = {};

  words.forEach(word => {
    word.split('').forEach(letter => {
      if (Object.keys(letters).includes(letter)) letters[letter]++;
      else letters[letter] = 1;
    });
  });

  if (!withVowels) {
    letters.a /= 2;
    letters.e /= 2;
    letters.i /= 2;
    letters.o /= 2;
    letters.u /= 2;
  }

  const arr = Object.keys(letters)
    .map(k => ({ letter: k, frequency: letters[k] }))
    .sort((a, b) => b.frequency - a.frequency);

  return { letterFrequenciesMap: letters, letterFrequenciesArray: arr };
}

export const { letterFrequenciesMap, letterFrequenciesArray } = getLetterFrequencies(false);

function getWordScore(word) {
  let score = 0;
  const letters = word.split('').filter((value, index, self) => self.indexOf(value) === index);
  letters.forEach(letter => {
    score += letterFrequenciesMap[letter] ?? 0;
  });

  return score;
}

function sortWordsByScore() {
  return words.sort((a, b) => getWordScore(b) - getWordScore(a));
}

export const wordsByScore = sortWordsByScore();

export function getBestWord(guesses) {
  return wordsByScore.find(word => {
    for (let guessIndex = 0; guessIndex < guesses.length; guessIndex++) {
      const guess = guesses[guessIndex];

      for (let letterIndex = 0; letterIndex < guess.length; letterIndex++) {
        const { letter, result } = guess[letterIndex];

        if (result === Status.Absent && word.includes(letter)) return false;
        if (result === Status.Present) {
          if (!word.includes(letter)) return false;
          if (word.split('')[letterIndex] === letter) return false;
        }
        if (result === Status.Correct && word.split('')[letterIndex] !== letter) return false;
      }
    }

    return true;
  });
}
