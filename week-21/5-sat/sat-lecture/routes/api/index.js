const express = require('express');
// const userRoutes = require('./userRoutes.js');
const menuRoutes = require('./menuRoutes.js');
const router = express.Router();
// router.use('/users', userRoutes);
router.use('/menu', menuRoutes);

router.get("/", (req, res, next) => {
    try {
        res.send(":)");
    } catch (error) {
        next(error);
    }
});



module.exports = router;
