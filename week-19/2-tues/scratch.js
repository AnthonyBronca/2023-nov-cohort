const express = require('express');

const app = express();

app.use(express.json());



app.get('/', (req, res, next) => {
    try {
        res.send(":)");
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/',(req, res, next) => {
    try {
        console.log(req.body)
        const {username} = req.body;
        if(username === "anthonybronca"){
            res.json({
                "message": "You are signed int"
            })
        } else{
            throw new Error("Bad username")
        }
    } catch (error) {
        res.send(error.message)
    }

})


app.put('/', (req, res, next)=> {
    //do stuff to update here
});

app.patch('/', (req, res, next)=> {
    // do stuff to update here
});

app.delete('/', (req, res, next)=> {
    // do stuff to deletr
})



const port = 8000;

app.listen(port, ()=> console.log('Now listenign on port: ', port))
