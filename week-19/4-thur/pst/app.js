const express = require('express');
const dotenv = require('dotenv'); //import the dotenv package from npm
dotenv.config(); //set up our app to use the .env files

const app = express();

app.use(express.json());


// send the secret data, if we are authroized using an API_KEY
app.get('/data', (req, res, next)=> {
    try {
        const {apiKey} = req.body;
        if(!apiKey){
            throw new Error("You need to pass in an API key in the body");
        } else if(apiKey !== process.env.API_KEY){
            throw new Error("You are not authorized to see the secret data");
        } else{
            res.json({
                data: "You are an awesome person!"
            });
        }
    } catch (error) {
        next(error);
    }
})


//send a happy face when in development, and a sad face when in production

if(process.env.NODE_ENV === "development"){
    app.get('/', (req, res, next)=> {
        res.send(":)")
    })
} else{
    app.get('/', (req, res, next)=> {
        res.send(":(")
    })
}


app.use((err, req, res, next) => {
    res.send(err.message);
})


const port = process.env.PORT; // <- keying in to the .env file looking for the variable we set
app.listen(port, ()=> console.log("You are tuned in to port: ", port));
