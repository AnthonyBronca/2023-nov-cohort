const express = require('express');

const app = express();


app.use(express.json()); //middleware


app.get('/', (req, res, next) => {
    res.json("hello")
});
app.post('/', (req, res, next) => {
    res.json("hello 2")
});

app.post('/user', (req,res,next) => {
    try {
        const {username} = req.body;
        res.status(205)
        console.log('hello')
        res.json({
            message: "You created a user"
        })

    } catch (error) {

    }
})

app.delete('/', (req,res,next)=> {
    //delete code
})

app.put('/', (req,res,next) => {
    //update code
})

app.patch('/', (req,res,next)=> {
    // patch a code
})



const port = 8000;

app.listen(port, () => console.log('listening on port: ', port));
