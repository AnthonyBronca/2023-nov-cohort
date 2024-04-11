# Middleware

There are two types of middlware in `Express`:

1. Regular middleware
2. Error handling middleware


Middlewares are like "plug and play" functions that will happen in between your route. You can use it to bounce around routes via one call. Think of it like calling a friend. You need to hit a cell tower, and then a satellite, and then another cell tower, and then it gets to your friends phone. With each middleman responsible for checking and processing the data in different ways.

We can use middleware for various purposes. Catch errors, prevent security risks, catch bad inputs like trying to hit routes that don't exist, using it to make our data look a specific way, or just to compartmentalize code that may be getting reused throughout the codebase in other routes.


With middleware, you have the option to plug it in globally to your app, or to pass it in locally to your route.

To make a global middlware we can use the `app.use` functionality. Note: All middleware needs `req`, `res`, and `next`. Error handling middleware is the same, but needs to use `err` as well (in the first position)

Here is an example of a global middleware that will check if we are not signed in:

```js

const express = require('express');
const app = express();

//global middleware that will be used in all of our routes
app.use((req, res, next)=> {
    try{
        const {credentials} = req.body;
        if(checkDatabase === credentials){ // we will learn how to check databases correctly next week
            next() // -> we are good so send it to the next step in line
        }
    } catch(e){
        next(e) //express knows we hit an error so it skips to the next error handling middleware
    }
})

app.listen(8000, ()=> console.log("listening on port 8000"));


```

Now, we did create a problem with this code. This is assuming that ALL of our routes require you to be signed in. We may not want that. For example, I may want to look at the items on a splash page for amazon without being signed in, and only be prompted to sign in when I want to make a purchase. Right now, I will likely get some sort of error message telling me I am not signed in. So for this reason, we may want to protect SOME routes and not make this a global middleware. To do this, we can plug it in to the route itself. Lets do some refactoring!

```js
const express = require('express');
const app = express();

//local middleware that will be used wherever we need to check for credentials
const credentialCheck = ((req, res, next)=> {
    try{
        const {credentials} = req.body;
        if(checkDatabase === credentials){ // we will learn how to check databases correctly next week
            next() // -> we are good so send it to the next step in line
        }
    } catch(e){
        next(e) //express knows we hit an error so it skips to the next error handling middleware
    }
})

app.get("/accountInfo", credentialCheck, (req, res, next)=> {
    try {
        //grab information from database
        res.send("database information")
    } catch (error) {
        next(error) //send any errors we may get to the next error handler
    }
})

app.listen(8000, ()=> console.log("listening on port 8000"));

```

Now, what if someone tries to hit a route that does not exist? Or what if someone hits an error in our database because of some power outage at our database storage location? We can create an error handling middleware to account for this:


```js
const express = require('express');
const app = express();

//local middleware that will be used wherever we need to check for credentials
const credentialCheck = ((req, res, next)=> {
    try{
        const {credentials} = req.body;
        if(checkDatabase === credentials){ // we will learn how to check databases correctly next week
            next() // -> we are good so send it to the next step in line
        }
    } catch(e){
        next(e) //express knows we hit an error so it skips to the next error handling middleware
    }
})

app.get("/accountInfo", credentialCheck, (req, res, next)=> {
    try {
        //grab information from database
        res.send("database information")
    } catch (error) {
        next(error) //send any errors we may get to the next error handler
    }
})

// catches all errors we may get through the entire application and sends it over.
// note: We could even use multiple of these global middlwares to slowly add more and more errors
app.use((err, req, res, next)=> {
    res.json({"error message": err.message}) //sends the message we got to the client.
})

app.listen(8000, ()=> console.log("listening on port 8000"));

```



> Additional readings below

----------------------------------------------------

# Express Middleware

Express is "essentially a series of middleware function calls"

## What is Middleware?

Conceptually: any code that runs between receiving a request and sending back the response

By Definition: any function that takes in `req`, `res`, and `next` as arguments

## How does Middleware work?

Express operates as a stack of middleware functions. It will execute these functions in order upon receiving a request, and stops executing once a response is sent back.

We can add layers to the middleware stack by creating our own middleware functions.

```js
// since this takes req, res, and next, it's an Express Middleware!

const myMiddleware = (req, res, next) => {
  console.log("I'm a middleware function!");
  next();
};
```

To get Express to use this function, we can pass it directly to a route handler

```js
app.get("/", myMiddleware);

// we can also continue to handle the request within the same handler

app.get("/", myMiddleware, (req, res) => {
  // Handling of the request
});
```

We can also pass it to `app.use()`. Anytime you've passed something to `app.use()`, you were adding a layer to the Express Middleware Stack! These are all examples of using middleware

```js
app.use(express.json());
app.use(express.static("/catPhotos"));
app.use(myMiddleware);
app.use((req, res, next) => {
  console.log(req.body);
  next();
});
```

Anything you pass to `app.use()` will get called **_every time_** a request is made.

If it's a built-in middleware (`express.json()`), then you don't have to worry about calling `next()`, it's already being done for you. If you are making your own middleware function, you **_must_** call `next()`

## next()

Calling `next()` will tell express to "return" out of our current function and run the next **_applicable_** function.

```js
const mid1 = (req, res, next) => {
  console.log("Hey I'm mid1!");
  next();
};

const mid2 = (req, res, next) => {
  console.log("Hey I'm mid2!!");
  next();
};

app.get("/", mid1, mid2);
```

When making a GET request to `/`

```md
# console will print

Hey I'm mid1!
Hey I'm mid2!!
```

Similarly

```js
const myMid = (req, res, next) => {
  console.log("Hey look I'm printing!");
  next();
};

app.get("/", myMid);

app.get("/", (req, res) => {
  console.log("Wow I printed after myMid!");
  res.send("This is the / response");
});
```

```md
# console will print

Hey look I'm printing!
Wow I printed after myMid!!

# browser will display

This is the / response
```

We can have more than one route handler for each route, and if the first one calls `next()`, the next route handler will be called. This can be chained as many times as we want.

However if the route pattern is not matched, it will be skipped!

```js
const myMid = (req, res, next) => {
  console.log("Hey look I'm printing!");
  next();
};

const missedMid = (req, res, next) => {
  console.log("I never get to print :(");
  next();
};

app.get("/", myMid);

app.get("/hello", missedMid);

app.get("/", (req, res) => {
  console.log("I still get to print!");
  res.send("This is the / response");
});
```

When making a GET request to `/`

```md
# console will print

Hey look I'm printing!
I still get to print!

# browser will display

This is the / response
```

But, if we make a GET request to `/hello`

```md
# console will print

I never get to print :(

# browser will display

Cannot GET /hello

# because we don't res.send() anything from /hello
```

---

---

# Error Handling Middleware

Express handles errors through middleware. There are default Development and Production environment errors

```js
app.use((req, res, next) => {
  throw Error();
});

// Development Environment - node app.js
Error
  at ... (Crazy Stack Trace)

// Production Environment - NODE_ENV=production node app.js
"Internal Server Error"
```

This functionality exists to give the developer a detailed error output so the problem can easily be debugged, and to ensure that a user doesn't see any unnecessary information when something goes wrong.

Although the default may work well, it's very useful to set our own error handlers.

## How to use error handling middleware

Error handling middleware _MUST_ have 4 parameters, `err`, `res`, `req`, and `next`, and `err` _NEEDS_ to be the first parameter. This is the only way for Express to recognize something as error handling middleware.

Just like with any other custom middleware, we pass our error handlers into `app.use()` so it can be ran on every request. Error handler should be defined after all other middleware and route handlers.

```js
app.use(express.json())
app.use(myMiddleware)

app.get(...)

app.get(...)

app.post(...)

app.delete(...)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500)
  res.send('Whoops! Some error happened I guess?')
})
```

## What a/A DOESN'T want you to know!?! 😳 😱 🤫

There is a very important difference between an **_error being thrown_** and an **_error being handled_**

Notice that simply hitting a route that doesn't exist **_does not_** throw an error, instead "Cannot get /urlPath" is sent to the browser. Adding in an error handler does not change that functionality

```js
app.get("/hi", (req, res) => {
  res.send("Hi there!");
});

// This is an error handler
app.use((err, req, res, next) => {
  res.send("Error: Never got to say hi :( ");
});
```

Making a GET to `/hello`

```md
Cannot GET /hello
```

One more time: **Having An Error Handler Does Not Throw An Error**

If we want our error handler to actually handle something, we have to manually throw an error (provided you don't have broken code). To throw an error, we create a regular middleware function and pass it to `app.use()` at the bottom of our other middleware, but before our error handling middleware.

```js
app.get("/hi", (req, res) => {
  res.send("Hi there!");
});

// This is throwing the error (notice no 'err' parameter)
app.use((req, res, next) => {
  throw new Error("We didn't find that resource");
});

// This is an error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res.send("Error: Never got to say hi :( ");
});
```

It is very important you don't pass 'err' to your error thrower! Express will never see that handler if you do.

Express reads the file from top to bottom and applies this middleware checklist:

1. Run any middleware that should run every time (e.g. `express.json()`)
2. Run any route handlers that match the request
3. If .send/.json is called, send the response. If next is called, run the next standard middleware
4. If an error is thrown or next is called with an error passed in, run the next error middleware
5. Restart from step 3 until a response is sent

The key here is standard vs error middleware. Express will only ever use standard middleware until an error is thrown. From there, error middleware is used as long as next is called with an error - `next(err)`. If next is called normally, the next standard middleware is called, including route handlers.
