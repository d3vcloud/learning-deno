import { paintLetter } from "./colors.ts";
import { writePokemonFile } from "./file.ts";
import { isGodMode } from "./env.ts";

const MAX_TRIES = 6;
const POKEMONS_AVAILABLE = 850;
const previousGuesses: Array<string> = [];
const randomId = Math.ceil(Math.random() * (POKEMONS_AVAILABLE - 1));

const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
const json = await response.json();
const pokemon: string = json.name.toUpperCase();

if(isGodMode) {
  await writePokemonFile(pokemon)
}

let globalResults = "";

const askWord = () => {
  const response = prompt("The Pokemon is...");
  if (response == null) {
    return { error: "💬 You must provide a pokemon" };
  } else if (response.length !== pokemon.length) {
    return { error: `📏 The pokemon must be ${pokemon.length} characters long` };
  } else if (previousGuesses.includes(response.toUpperCase())) {
    return { error: `📄 You already tried this pokemon name` };
  } else if (!/^[a-zA-Z]+$/.test(response)) {
    return { error: `📄 The pokemon name must contain only letters` };
  }
  return { response: response.toUpperCase() };
};


const print = (guess: string) => {
  console.clear();
  let results = "";
  const letters: Array<string> = [...guess];
  letters.forEach((letter, index) => {
    if (letter === pokemon.at(index)) {
      results += paintLetter("green", letter);
    } else if (pokemon.includes(letter)) {
      results += paintLetter("yellow", letter);
    } else {
      results += paintLetter("gray", letter);
    }
  });
  globalResults += `${results} \n\n`;
  console.log(globalResults);
};

const start = (tries: number) => {
  if (tries >= MAX_TRIES) {
    console.log("😵‍💫 You lost!");
    console.log("😵‍💫 The pokemon was " + pokemon);
    return;
  }
  let guess = "";
  while (guess === "") {
    const { error, response } = askWord();
    console.log(response);
    if (error) {
      console.error(error);
      continue;
    }
    if (response) guess = response;
  }
  if (guess === pokemon) {
    print(guess);
    console.log("🎈 You won!");
    return
  } else {
    print(guess);
    console.log("");
    tries++;
    start(tries);
  }
};

const timesPlayed = +(localStorage.getItem('times_played') || 0)
localStorage.setItem('times_played', (timesPlayed + 1).toString())

console.log(`🎮 Let\'s play a Game. Guess the Pokemon Name`);
console.log(`💡 Hint. It has ${pokemon.length} characters.`);
console.log(`You have played ${timesPlayed} time`);
start(0);
