const express = require('express');
const {Menu} = require('../../db/models')
const router = express.Router();

router.get('/', async(req, res, next)=> {
    try {
        // database stuff query
        const menu = await Menu.findAll();
        res.json(menu);
    } catch (error) {
        next(error);
    }
});




module.exports = router;
