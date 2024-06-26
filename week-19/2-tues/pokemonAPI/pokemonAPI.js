const express = require('express')
const app = express()

const noPokemon = require('./middleware/noPokemon')

// Default route. Simply gets a string of "Hello World"
app.get('/', (req, res) => {
    res.send("Hello world")
})

// Route to hit the pokemon API for "Ditto"
// Not the best route because it's static to fetch ditto
    // An "async" is NOT necessary for the fetch because of .then() chaining. The data is converted immediately afterwards
app.get('/pokemon', (req, res) => {
    try {
        fetch('https://pokeapi.co/api/v2/pokemon/ditto')
            .then((res) => res.json())
            .then((pokemon) => res.json(pokemon))
    } catch (e) {
        console.error(e.message)
    }
})

// Route to hit the API endpoint for any pokemon passed into the parameter
// Includes a middleware: "noPokemon"
// async is necessary here because no .then() chaining is used. The fetch promise needs to resolve first before moving onto the next steps
app.get('/pokemon/:pokemonName', noPokemon, async (req, res) => {
    try{
        const pokemonName = req.params.pokemonName
        const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const data = await pokemonData.json()

        res.json(data)
    } catch(e) {
        console.error(e)
    }
})

// Catch for when users try to hit a URL that doesn't exist
app.use((req, res) => {
    res.send("You found a non-existent endpoint")
})

const port = 3001
app.listen(port, () => {
    console.log("Port is listening on: ", port)
})
