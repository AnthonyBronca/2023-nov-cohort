// imports
const express = require('express');
// require('express-async-errors');
const asnycHandler = require('express-async-handler');

// applications and middleare
const app = express();
app.use(express.json());


// routes

// bad code, hangs due to async functionality, but sync error functionality.
// app.get('/', (req, res, next)=> {
//     try {
//         fetch("https://pokeapi.co/api/v2/pokemon/dittoooo")
//         .then((res)=> res.json())
//         .then((data)=> res.json(data));
//     } catch (error) {
//         next(error);
//     }
// })

// fixed version of route using express-async-erors and await
app.get('/', async(req, res, next)=> {
    try {
        // let apiResult;
        // fetch("https://pokeapi.co/api/v2/pokemon/dittoooo")
        // .then((res)=> res.json())
        // .then((data)=> res.json(data));

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/dittoooo");
        const data = await response.json();
        res.json(data);
        // res.json(apiResult);
        // res.send(":)");
    } catch (error) {
        next(error);
    }
})

// one way to achieve async errors using asyncHandler middlware (note the import)
// app.get('/', asnycHandler(async(req, res, next)=> {
//     try {
//         const response = await fetch("https://pokeapi.co/api/v2/pokemon/dittoooo");
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         next(error);
//     }
// }));

// global error handler middleware
app.use((err, req, res, next)=> {
    const prettyError = {
        message: err.message,
        statusCode: 500,
        stack: err.stack
    };
    res.status(500);
    res.json(prettyError);
});


const port = 8000;
app.listen(port, ()=> console.log("listening on port", port));
