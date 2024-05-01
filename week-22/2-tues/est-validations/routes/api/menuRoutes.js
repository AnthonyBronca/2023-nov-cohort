const express = require('express');
const { Menu } = require('../../db/models');
const { or, Op } = require('sequelize');
const router = express.Router();

const validateMenuItem = (req, res, next) => {
    try {
        if (!req || !req.body) {
            throw new Error("You must have a request body");
        }

        if (!req.body.menuItemName) {
            throw new Error("You must pass in a menuItemName");
        }

        if (!req.body.price) {
            throw new Error("You must pass in a valid price");
        }
        next()
    } catch (error) {
        res.status(500);
        next(error);
    }
}


// get all
// router.get('/', async (_req, res, next) => {
//     try {
//         const menu = await Menu.findAll();
//         res.json(menu);
//     } catch (error) {
//         next(error);
//     }
// });

// get one by pk
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Menu.findByPk(id);
        res.json(item);
    } catch (error) {

    }
})

// router.get('/', async (req, res, next) => {
//     try {
//         const { name, price } = req.query;
//         let searchName = "";
//         let searchPrice;
//         if (name) {
//             searchName = name;
//         }
//         if (price) {
//             searchPrice = parseInt(price);
//         }

//         const items = await Menu.findAll({
//             where: {
//                 [Op.or]: [
//                     {
//                         name: searchName,
//                     },
//                     {
//                         price: {
//                             [Op.gte]: searchPrice
//                         }
//                     }
//                 ]
//             },
//         });


//         res.json(items);
//     } catch (error) {
//         next(error);
//     }
// });


router.post('/', async (req, res, next) => {
    try {
        const { menuItemName, price } = req.body;
        const newItem = await Menu.create({ name: menuItemName, price })
        res.json({
            message: "succesfully created",
            newItem
        });
    } catch (error) {
        next(error)
    }
})


router.post('/', validateMenuItem, async (req, res, next) => {
    try {
        const { menuItemName, price } = req.body;
        const newItem = await Menu.create({ name: menuItemName, price });
        res.status(201);
        res.json({
            status: "Success",
            newItem
        });

    } catch (error) {
        next(error);
    }
});

// router.put('/:id',validateMenuItem, async(req, res, next)=> {
//     try {
//         const {id} = req.params;
//         const {menuItemName, price} = req.body;
//         const oldItem = await Menu.findByPk(id);
//         if(menuItemName && menuItemName !== oldItem.name){
//             oldItem.name = menuItemName;
//         }
//         if(price){
//             let numPrice = parseInt(price);
//             if(numPrice !== oldItem.price){
//                 oldItem.price = numPrice;
//             }
//         }
//         oldItem.save();
//         res.json({status: "successful", oldItem})
//     } catch (error) {
// next(error)
//     }
// })

router.put('/:id', validateMenuItem, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { menuItemName, price } = req.body;
        const oldItem = await Menu.findByPk(id);
        oldItem.update({name: menuItemName, price})
        res.json({ status: "successful", oldItem })
    } catch (error) {
    next(error)
    }
})


router.delete('/:id', async(req, res, next)=> {
    try {
        const {id} = req.params;
        const itemToDelete = await Menu.findByPk(id);
        if(itemToDelete){
            itemToDelete.destroy();
        }
        res.json({
            "status": "delete successful",
            "oldItem": itemToDelete
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
