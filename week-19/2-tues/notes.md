# Week 19 - Day 2

## Introduction

#### Instructional Team:
- Instructor: Anthony Bronca
- Mod Assistant: Sam Bae


### Section 2 overview
- Mod 4: Servers, backend, databases
- Mod 5: Frontend, react, redux
- Mod 6: Python, Micro services, Docker
- Mod 7: Capstone, Career quest, Graduation


### Express

Before we look at Express, lets talk about servers. Remember in mod 3, when we were working with servers and postman, there was this ugly syntax code for setting up a vanilla server with Javascript. Here is an example:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Splash Page');
  }
  if (req.method === 'POST' && req.url === '/cat') {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Created a Cat!');
  }
});

const port = 8000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


```

This works perfectly fine, however, the code can start getting pretty nested and ugly to look at as the code base increases. This is what Express aims to resolve.


Express is a framework for building servers. It allows us to build clean, fast, and efficient servers using Javascript. It is really easy to set up, and can also easily use `middleware` to plugin and enhance our code.

Here is an example of `GET` and `POST` routes in `Express`

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  /* All sorts of stuff */
});

app.post("/", (req, res) => {
  /* All sorts of stuff */
});

const port = 5000;
app.listen(port, () => console.log("Server is listening on port", port));

```


#### Middleware

`Middleware`, in `Express`, is one of those things that sounds confusing. All it is, is a function you can plug in that uses `req`, `res`, and `next`. We can use `middleware` for things like letting our request access JSON, or adding security benefits like CSRF protection, and so much more. You could even make your own `middleware`, for example to make some sort of response look pretty.

Example of building a middleware:

```js
const myMiddleware = (req, res, next) => {
  console.log("I'm a middleware function!");
  next();
};

```

> Keywords breakdown

- req -> this is the request coming from the client
- res -> this is the response that will be sent by the server
- next -> this is a function that will send data to the next server stack layer


To use this middleware, we could eithe rpass it into a route directly:

```js

app.get("/", myMiddleware, (req, res) => {
  // Handling of the request
});

```

or you can pass it to work globally for the server:

```js
app.use(myMiddleware);
```

### JSON

As a reminder, JSON stands for Javascript Object Notation. It is a way of sending data in very light weight and easy to use structures. To add the ability to read and send JSON (we will do this a lot) we need to use some middleware!

```js
app.use(express.json());
```

This means that all of our routes in the future can now receive and send JSON, which makes our lives super easy!

This is an example of data for a user that can be sent as JSON:

```json

{
    "name": "anthony bronca",
    "age": "unknown",
    "height": {
        "feet": 5,
        "inches": 9
        },
    "occupation": "software engineer"
}

```

Notice:

- Double quotes around both the keys and values
- no trailing commas
- you can use numbers
- you can use nested objects


### CRUD Routes

`GET` - Read

```js

app.get('/', (req, res, next)=> {
    try{
        const {username} = req.body; // destructure the username from the request body

        // check database -> will learn this later
        if(!database.username){ //if database does not have username
            throw new Error("No user found")
        }
        res.json({user}) // returns JSON -> {"user": {"username": "anthony"}}

    } catch(e){
        next(e); //sends our error to the next -> probably something to make errors pretty
    }
})

```

`POST` - Create

```js
app.post('/', (req, res, next)=> {
    try{
        const {username} = req.body; // destructure the username from the request body

        // check database -> will learn this later
        if(!database.username){ //if database does not have username
            throw new Error("No user found")
        } else{
            // add user to database
        }

        res.json({user}) // returns JSON -> {"user": {"username": "anthony"}}

    } catch(e){
        next(e);
    }
})
```

`PUT`/`Patch` - Update

```js
app.put('/', (req, res, next)=> {
    try{
        const {newUsername} = req.body; // destructure the username from the request body

        // check database -> will learn this later
        if(database.newUsername){ //if database does not have username
            throw new Error("Username is already taken")
        } else{
            // find user in database and update it
            res.json({user}) // returns JSON -> {"user": {"username": "anthony"}}
        }

    } catch(e){
        next(e);
    }
})
```

`DELETE` - Delete

```js
app.delete('/', (req, res, next)=> {
    try{
        const {username} = req.body; // destructure the username from the request body

        // check database -> will learn this later
        if(!database.username){ //if database does not have username
            throw new Error("No user found")
        } else{
            // delete user from database
            res.json({user}) // returns JSON for deleted user-> {"user": {"username": "anthony"}}
        }
    } catch(e){
        next(e);
    }
})
```
