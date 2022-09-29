const response = await fetch('https://pokeapi.co/api/v2/pokemon/charmander')
const json = await response.json()
console.log(json)

/**
 * Another way to get data
 * fetch('https://pokeapi.co/api/v2/pokemon/charmander')
 * .then(response => response.json())
 * .then(res => console.log(res))
 */