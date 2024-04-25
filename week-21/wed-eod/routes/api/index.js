const express = require('express');
const menuRouter = require('./menuRoutes');

const router = express.Router();
router.use('/menu', menuRouter);




module.exports = router;
