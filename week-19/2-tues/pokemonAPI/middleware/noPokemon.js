const express = require('express')
const app = express()

// Middleware will check the pokemon name that gets passed in through the request body
    // "response" will return a promise that is resolved that has a "status" property
// The try-catch block will run the "try" block first and when the error is thrown, the "catch" block will catch that error
    // If the "status" code is something like 404, then you know the response wasn't good, and you can throw an error
const noPokemon = async function (req, res, next) {
    try {
        const pokemon = req.params.pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        if (response.status !== 200) {
            throw new Error("Missingno found!")
        }

        return next()
    } catch (error) {
        res.send(error.message)
    }
}


module.exports = noPokemon
