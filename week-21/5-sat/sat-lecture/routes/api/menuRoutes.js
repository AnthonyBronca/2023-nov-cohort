const express = require('express');
const { Menu } = require('../../db/models');
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



/*

SELECT * FROM menus;



*/


router.get('/', async (_req, res, next) => {
    try {
        // findAll does -> SELECT * FROM menus;
        const menu = await Menu.findAll();
        // findAll returns 1 of two things, -> [], [{menu objs}]
        res.json(menu);

    } catch (error) {
        next(error);
    }
});


// router.get("/:id", async(req, res, next)=> {
//     try {
//         const {id} = req.params;
//         // findByPk -> SELECT * FROM menu WHERE id=id
//         const menuItem = await Menu.findByPk(id);
//         res.json(menuItem);

//     } catch (error) {
//         next(error);
//     }
// });


router.get("/:id", async (req, res, next) => {
    try {

        const { menuItemName, price } = req.body;

        let myMenuItem;


        if (menuItemName) {
            /*

            findOne -> SELECT * from MENU WHERE name=menuItemName
            IMPORT TO KNOW -> this returns the first item that meets that condition.

            */
            myMenuItem = await Menu.findOne({
                where: {
                    name: menuItemName
                }
            });
        }

        res.json(myMenuItem);


    } catch (error) {
        next(error);
    }
});


// CREATE

router.post('/', validateMenuItem, async (req, res, next) => {
    try {
        const { menuItemName, price } = req.body;

        // create -> INSERT INTO <table> VALUES()
        // Tip: make sure to reference what is allowed to be null/ not null from migrations file

        const newItem = await Menu.create({
            name: menuItemName,
            price
        })

        if (newItem) {
            res.json({
                status: "successfully created",
                newItem
            });

        } else {

            throw new Error("Item could not be created at this time");
        }

    } catch (error) {
        next(error);
    }
});


// // update -> more akin to a patch
// router.patch('/:id', validateMenuItem, async (req, res, next) => {
//     try {

//         // 1. figure out what we have
//         const {id} = req.params;
//         const {menuItemName, price} = req.body;

//         // 2. see if the thing we want to update exists
//         const oldItem = await Menu.findByPk(id);

//         if(oldItem){
//             console.log(oldItem);
//             if(menuItemName !== oldItem.name){
//                 oldItem.name = menuItemName;
//             }
//             if(price !== oldItem.price){
//                 oldItem.price = Number(price);
//             }

//             // after updates -> dont forget to save
//             oldItem.save();

//             res.json({
//                 status: "Successfully updated",
//                 updatedItme: oldItem
//             })


//         } else{
//            throw new Error("Could not find an item with that id");
//         }

//     } catch (error) {
//         next(error);
//     }
// });


// update the whole object
router.put('/:id', validateMenuItem, async (req, res, next) => {
    try {

        // 1. figure out what we have
        const { id } = req.params;
        const { menuItemName, price } = req.body;

        // 2. see if the thing we want to update exists
        const oldItem = await Menu.findByPk(id);

        if (oldItem) {
           oldItem.update({
            name: menuItemName,
            price
           });

            res.json({
                status: "Successfully updated",
                updatedItme: oldItem
            })


        } else {
            throw new Error("Could not find an item with that id");
        }

    } catch (error) {
        next(error);
    }
});



// delete

router.delete('/:id', async(req, res, next)=> {
    try {
        // 1. find what we want to delete
        const {id} = req.params;
        const deletedItem = await Menu.findByPk(id);

        if(deletedItem){

            deletedItem.destroy();
            res.json(deletedItem)

        } else{
            throw new Error("No item found to delete");
        }

    } catch (error) {
        next(error);
    }
})

















// router.get('/', async (req, res, next) => {
//     try {
//         const menu = await Menu.findAll();
//         res.json(menu);
//     } catch (error) {
//         next(error);
//     }
// });

// router.post('/', validateMenuItem, async (req, res, next) => {
//     try {
//         const {menuItemName, price} = req.body;
//         const newItem = await Menu.create({name: menuItemName, price});
//         res.status(201);
//         res.json({
//             status: "Success",
//             newItem
//         });

//     } catch (error) {
//         next(error);
//     }
// });




module.exports = router;
