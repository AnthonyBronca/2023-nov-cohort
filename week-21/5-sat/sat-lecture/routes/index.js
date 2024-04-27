const express = require('express');
const apiRoutes = require('./api')
const router = express.Router();

router.use('/api', apiRoutes);

router.get("/", (req, res, next)=> {
    try {
        res.send("Regular Route");
    } catch (error) {
        next(error);
    }
});



module.exports = router;
