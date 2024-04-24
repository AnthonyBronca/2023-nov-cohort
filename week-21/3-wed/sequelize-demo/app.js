const express = require('express');
const {User} = require('./models')

const app = express();

// global middleware
app.use(express.json());



app.get('/', async(req, res, next)=> {
    try {
        // database;
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// error handling

// 404
app.use((req, res, next)=> {
    try {
        res.status(404);
        throw new Error("No resource found.");
    } catch (error) {
        next(error);
    }
});


// error handler middleware

app.use((err, req, res, next)=> {
    res.json({
        message: err.message,
        status: res.status,
        stack: err.stack
    });
});





const port = process.env.PORT;
app.listen(port, ()=> console.log("You are tuned in to port: ", port));
