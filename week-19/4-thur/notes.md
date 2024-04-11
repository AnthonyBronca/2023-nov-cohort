# Environment Variables


Now that we are working with the backend, we can cause a lot of issues with our code by accidentally exposing sensitive information. For example, we may not want the port we use to be publicly available. Or maybe we want to have some sort of secret token for verification purposes with our 3rd party APIs, and we do not want to share that on github or expose that to our production code.


Enter the `.env` file!

This is a file that is to be kept secret locally/in production. You should not be sharing this file on github. You can store sensitive information here and use it within your code without fear of exposing information to the world.

Let's create a `.env` file in our backend. Then, we can specify a hidden port variable. It is good practice to use all caps for variable names. This tells other developers that these are constants and should not be changed.

```sh
PORT=8000
```

Notice there is no space between the equal signs either.

Now, in our `express` application, we can reference this using `process.env`. The `.env` file is read and loaded once, and that is only on application start up. These get stored in the process, and are kept secret. In order for our application to use the `.env` though, we need to install `dotenv`.

```
npm install dotenv
```

Now we can import it, and configure it.

```js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());


app.get("/", (req, res, next)=> {
    res.send(':)')
});

const port = process.env.PORT;
app.listen(port, ()=> console.log("listening on port: ", `${port}`));


```

Notice we can key into it, and it lives on the `process.env` object. Now if we have some bad actors trying to source our code in the browser or on github, they won't know what port we are using.

We can take this a step further by having specific code run if we are production compared to development (like in dev we may want to see password for ease of development, but in production we should not be sending passwords)

Take a look at the scratch.js file for the day to see more code using the `.env`

`.env`s are 🍰!!!!
