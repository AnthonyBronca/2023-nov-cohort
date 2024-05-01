const express = require('express');
const api = require('./routes');
const app = express();
app.use(express.json());
app.use(api);

app.use((_req, res, next)=> {
    try {
        res.status(404);
        throw new Error("No Resource Found.");
    } catch (error) {
        next(error);
    }
});

app.use((err, _req, res, _next)=> {
    if(!res.status){
        res.status(500);
    }
    res.json({
        message: err.message,
        status: res.status,
        stack: err.stack,
    })
})


const port = process.env.PORT;
app.listen(port, ()=> console.log("Listening on port: ", port));
