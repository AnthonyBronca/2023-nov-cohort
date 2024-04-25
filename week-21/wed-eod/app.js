const express = require('express');
const routes = require('./routes');
const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (_req, res, next) => {
    try {
        res.send(":)");
    } catch (error) {
        next(error);
    }
});


// 404
app.use((_req, res, next)=> {
    try {
        res.status(404);
        throw new Error("No Resource Found.");
    } catch (error) {
        next(error)
    }
});

// error handling middlware

app.use((err, _req, res, _next)=> {
    res.json({
        message: err.message,
        status: res.status,
        stack: err.stack
    })
})


const port = process.env.PORT;

app.listen(port, ()=> console.log("Listening on port: ", port));
