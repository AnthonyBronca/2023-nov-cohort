const express = require('express');
const app = express();

app.use(express.json());


class AnthonyError extends Error{
    constructor(message, statusCode = 500){
        super(message)
        this.message = message || "You are a fool :P";
        this.statusCode = statusCode;
    }
}


//global middleware that will check if the body has a key called 'arr' and if so, add a 2
app.use((req, res, next) => {
    try {
        const {arr} = req.body;

        if(!arr){
            throw new AnthonyError("You are a dummy for not using api correctly", 400)
        } else{
            arr.push(2)
            next()
        }


    } catch (error) {
        next(error);
    }

})

//local middleware

const addThree = ((req, res, next) => {
    try {
        const { arr } = req.body;

        if (!arr) {
            throw new AnthonyError()
        } else {
            arr.push(3)
            next()
        }

    } catch (error) {
        next(error)
    }
})



app.post('/', (req, res, next)=> {
    const {arr} = req.body;
    res.json(arr)
})

app.post('/cat', addThree,  (req, res, next)=> {
    const {arr} = req.body;
    res.json(arr)
})


app.use((err, req, res, next)=> {
    // console.log(err);
    const prettyResponse = {
        message: err.message,
        status: err.statusCode
    }
    res.status(err.statusCode);
    // console.log(err.statusCode)

    res.json(prettyResponse)
})


const port = 8000;
app.listen(port, ()=> console.log("Listening on port: ", port));
