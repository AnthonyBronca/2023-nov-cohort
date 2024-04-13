// imports
const express = require('express');
const dogsRouter = require('./routes/dogs');





// middleware and app initializatio
const app = express();
app.use("/dogs", dogsRouter);
// prefix, router
app.use(express.json());


app.get('/people', (req, res, next)=> {
    try {
        res.send('people');
    } catch (error) {
        next(error)
    }
})








// app.get('/people/person/:personId/book', (req, res, next)=> {
//     try {
//         res.send('people');
//     } catch (error) {
//         next(error)
//     }
// })

// app.get('/dogs', (req, res, next)=> {
//     try {
//         res.send('dogs');
//     } catch (error) {
//         next(error)
//     }
// })

// app.get('/foods', (req, res, next)=> {
//     try {
//         res.send('foods');
//     } catch (error) {
//         next(error)
//     }
// })

// app.get('/movies', (req, res, next)=> {
//     try {
//         res.send('movies');
//     } catch (error) {
//         next(error)
//     }
// })

// app.get('/activities', (req, res, next)=> {
//     try {
//         res.send('activities');
//     } catch (error) {
//         next(error)
//     }
// })


const port = 8000;
app.listen(port, ()=> console.log("listening on ", port));
