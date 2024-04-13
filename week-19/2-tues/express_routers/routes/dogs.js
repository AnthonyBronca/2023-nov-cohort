// routers
// prefix -> /dogs,

const express = require('express');
const router = express.Router();


router.get('/', (req, res, next)=> {
    res.send("You are in the dogs route")
})



module.exports = router;
