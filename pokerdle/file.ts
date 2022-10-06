export const writePokemonFile = (pokemon: string) => {
  const encoder = new TextEncoder()
  const pokemonEncoded = encoder.encode(pokemon)
  return Deno.writeFile('./solution.txt', pokemonEncoded)
}