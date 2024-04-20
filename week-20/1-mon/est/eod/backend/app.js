const express = require('express');
require('express-async-errors');
const DATABASE = process.env.DB_URL
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(DATABASE, sqlite3.OPEN_READWRITE);

const app = express();
app.use(express.json());

app.use((req, res, next)=> {
    try {
        if(!req.body){
            throw new Error("You must pass in a body")
        } else if(!req.body.access){
            throw new Error("You must pass in access token in the body")
        } else if(req.body.access !== process.env.ACCESS){
            throw new Error("You are not authorized to view this API")
        } else{
            next()
        }
    } catch (error) {
        next(error)
    }
})


// create menu_item
app.get('/menu', (req, res, next)=> {
    try {
        const sql = 'SELECT * FROM menu_items;'
        const params = [];
        db.all(sql, params, (err, rows)=> {
            res.json(rows);
        })
    } catch (error) {
        next(error)
    }
})

app.post('/menu', (req, res, next)=> {
    try {
        if(!req.body.newFood || !req.body.price){
            throw new Error("You must pass in a newFood key and a price")
        } else if(typeof req.body.newFood !== 'string' || typeof req.body.price !== 'number'){
            throw new Error("newFood must be a string and price must be a number")
        } else{
            const {newFood, price} = req.body;
            const sql = `INSERT INTO menu_items (name, price) VALUES (${newFood},${price});`;
            const params = [];
            db.run(sql, params, err => {
                if (err) {
                    next(err);
                } else {
                    db.get(sqlLast, [], (err, row) => {
                        res.json(row);
                    });
                }
            })
        }
    } catch (error) {
        next(error)
    }
})

app.use((req, res, next) => {
    try {
        res.statusCode = 404;
        throw new Error("Resource Not Found");
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next)=> {
    if(!res.statusCode){
        res.statusCode = 500
    }
    res.json(err.message);
})


const port = process.env.PORT;
app.listen(port, ()=> console.log("listening on port: ", port));
