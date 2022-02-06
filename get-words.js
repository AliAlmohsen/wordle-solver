import fs from "fs";

function getWords() {
  return JSON.parse(
    fs.readFileSync("/Users/alialmohsen/Code/wordle/words.json", "utf8")
  );
}

export const words = getWords();

function getLetterFrequencies(withVowels) {
  const letters = {
    b: 0,
    c: 0,
    d: 0,
    f: 0,
    g: 0,
    h: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  if (withVowels) {
    letters.a = 0;
    letters.e = 0;
    letters.i = 0;
    letters.o = 0;
    letters.u = 0;
  }

  words.forEach((word) => {
    word.split("").forEach((letter) => {
      if (Object.keys(letters).includes(letter)) letters[letter]++;
    });
  });

  if (!withVowels) {
    letters.a = 704;
    letters.e = 705;
    letters.i = 702;
    letters.o = 703;
    letters.u = 701;
  }

  const arr = Object.keys(letters)
    .map((k) => ({ letter: k, frequency: letters[k] }))
    .sort((a, b) => b.frequency - a.frequency);

  return { letterFrequenciesMap: letters, letterFrequenciesArray: arr };
}

export const { letterFrequenciesMap, letterFrequenciesArray } =
  getLetterFrequencies(false);

function getWordScore(word) {
  let score = 0;
  const letters = word
    .split("")
    .filter((value, index, self) => self.indexOf(value) === index);
  letters.forEach((letter) => {
    score += letterFrequenciesMap[letter] ?? 0;
  });

  if (letters[4] === "s") score -= 700;

  return score;
}

function sortWordsByScore() {
  return words.sort((a, b) => getWordScore(b) - getWordScore(a));
}

export const wordsByScore = sortWordsByScore();

export function getBestWord(guesses) {
  return wordsByScore.find((word) => {
    for (let guessIndex = 0; guessIndex < guesses.length; guessIndex++) {
      const guess = guesses[guessIndex];

      for (let letterIndex = 0; letterIndex < guess.length; letterIndex++) {
        const { letter, result } = guess[letterIndex];

        if (result === "b" && word.includes(letter)) return false;
        if (result === "y") {
          if (!word.includes(letter)) return false;
          if (word.split("")[letterIndex] === letter) return false;
        }
        if (result === "g" && word.split("")[letterIndex] !== letter)
          return false;
      }
    }

    return true;
  });
}
