const express = require('express');
const {BadDataError} = require('./errors/errors')
const {processWin} = require('./middlewares/processWin')

const app = express();

app.use(express.json());

// build an error handler that will be global, and check if we have the correct body;
app.use((req, res, next)=> {
    try {
        const choices = {
            rock: "rock",
            scissors: "scissors",
            paper: "paper"
        }

        const {choice} = req.body;

        // checking that choice exists
        if(!choice){
            throw new BadDataError("Bad Data", 500);
        } else if(!choices[choice]){
            throw new BadDataError("Bad Data", 500);
        }
        else { //good data
            next(); //good next, nothing gets passed
        }

    } catch (error) {
        next(error) // bad next, starts the error middle wares
    }

})

// global error handler
app.use((err, req, res, next)=> {
    // console.error(err);
    const prettyError = {
        message: err.message,
        status: err.statusCode
    };
    res.status(err.statusCode)
    res.json(prettyError);
})


// Build a route
app.post('/', processWin, (req, res, next) => {


})

const port = 8000;
app.listen(port, ()=> console.log("You are listening on port", port));
