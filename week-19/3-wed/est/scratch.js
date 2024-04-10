const express = require('express');

const app = express();
app.use(express.json())


class AnthonysCustomError extends Error{
    constructor(message, statusCode = 404){
        super(message)
        this.message = message || "This is bad data";
        this.statusCode = statusCode
    }
}

app.use((req, res, next)=> {
    try {
        const {arr} = req.body;

        if(!arr){
            throw new AnthonysCustomError("You must pass an arr key word", 500)
        } else{
            arr.push(2);
            next();
        }
    } catch (error) {
        next(error)
    }
})

// a global error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        "Message": err.message
    })
})


const addThree = (req, res, next) => {
    const {arr} = req.body;
    arr.push(3)
    next()
}


app.get('/', addThree, (req, res, next)=> {
    try {
        const {arr} = req.body;
        arr.push(4)
        // database
        // throw new AnthonysCustomError()
        res.json(arr)

    } catch (error) {
        res.send(error.message)
    }
})
app.get('/nothree', (req, res, next)=> {
    try {
        const {arr} = req.body;
        arr.push(4)
        // database
        // throw new AnthonysCustomError()
        res.json(arr)

    } catch (error) {
        res.send(error.message)
    }
})



const port = 8000;

app.listen(port, ()=> console.log("listening on port", port));
