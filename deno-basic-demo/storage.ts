fetch('https://pokeapi.co/api/v2/pokemon/charmander')
  .then(response => response.json())
  .then(res => {
    console.log(localStorage.setItem('pokemon', res.name))
    console.log(res)
  })

