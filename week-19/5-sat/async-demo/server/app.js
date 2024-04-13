// imports
const express = require('express');
require("express-async-errors");
const dogsRouter = require('./routes/dogs');
// app initialization and app middlewares
const app = express();
app.use(express.json());
app.use("/dogs", dogsRouter);


/*
Custom error placed here for simplicity because majority says so :)
This step is not always needed but is very professional
*/

class MyCustomError extends Error {
  constructor(message, statusCode){
    super(message)
    this.message = message;
    this.statusCode = statusCode;
  }
}


// global middleware for logging
app.use((req, res, next) => {
  console.log(req.url); // Before the response
  console.log(req.method); // before the response
  next(); // -> goes into the route if not using local middleware
  res.on("finish", ()=> {
    console.log(res.statusCode)
  })
})


// **** routes ***


// For testing purposes, GET /
app.get('/', (req, res, next) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res, next) => {
  try {
    throw new Error("Hello World!");
  } catch (error) {
    next(error);
  }
});

// 404 no resource found middleware
app.use((req, res, next)=> {
  try {
    res.status(404);
    throw new MyCustomError("The requested resource couldn't be found.", 404);
  } catch (error) {
    next(error);
  }
})

// Global error handler middleware
app.use((err, req, res, next)=> {
  const prettyError = {
    message: err.message,
    statusCode: err.statusCode
  }

  if(process.env.NODE_ENV === "development"){
    prettyError.stack = err.stack;
  }

  res.json(prettyError);
})

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
