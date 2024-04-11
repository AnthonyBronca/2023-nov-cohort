const express = require('express');
const dotenv = require('dotenv'); // This allows us to read .env files
dotenv.config(); // this sets up our dotenv functionality to start working

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === "development"){
    app.get("/", (req, res, next)=> {
        res.send(":)")
    })
} else {
    app.get("/", (req, res, next)=> {
        res.send(":(")
    })

}


app.get('/data', (req, res, next)=> {
    try {
        const {apiKey} = req.body;
        if(!apiKey){
            throw new Error("Send an api key please")
        } else if(apiKey !== process.env.API_KEY){
            throw new Error("You are not authorized to access this data")
        } else{
            res.json({
                data: "You are awesome"
            })
        }

    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    res.send(err.message);
})


const port = process.env.PORT;

app.listen(port, ()=> console.log("Listening on port:   ", port))
