# Week 21 - 22 Study Guide


## PRO TIPS:

- DO THIS PRACTICE ASSESSMENT A MINIMUM OF 5 TIMES. NOT JOKING. SERIOUSLY. 5 TIMES IS MINNNNIUMUM!!!
- Suggest working on the one-to-many/many-to-many practices
- Suggest working on the validation practices
- Suggest working on sequelize long practices
- Did I mention you should do the practice assessment 5 times MINIMUM? Yeah, do that 😄
- THIS ASSESSMENT IS VERY DENSE, time will not be your friend so make sure to feel comfortable enough to speed through the little steps (which is why I recommend memorizing commands rather than finding the cheatsheet). But also make sure you know what you are doing with each command.
- AVOID TYPOSSSS. CHECK YOUR WORK CONSISTENTLY. It is easier to debug piece-by-piece as you go, than to debug such a large code base. Some of these points stack, so if you fail to get the earlier stuff, it may be impossible to get the later points too.


## Sequelize Set Up

- Know how to set up sequelize from scratch
- What two things should you install for sequelize?
- Know how to make model, migration, seeder folders
- Know how to set up a .env to work with a database
- Know when to use `dotenv` in commands
## Migration Set up

- Know how to create migration files
- Know how to fill out migration files
- Know what a migration file does
- Know how to run a migration file/s
## Model Set up

- Know how to create a model file
- Know how to fill out a model file with constraints
- Know how to fill out a model file validations
## Seeder set up

- Know how to create a seeder file
- Know how to create seeds within that file
- How to seed your database
## Manage existing migrations/seeds/database

- Know how to undo migrations
- Know how to undo seeds
- Know how to restart your database (dropping it. Hint: You can delete the db file if using sqlite)
## Advanced Model adjustments

- FEEL VERY COMFORTABLE WITH VALIDATIONS
- Know where validations go
- Know how to make custom validations
- Know how to read test specs for what the expected validations on any given table are
## Relationships (migrations/models/queries)

- Know how to create relationships (one-to-many/many-to-many) on a migration file
- Know how to create relationships (1-to-many/m-to-m) on a model file
- Know how to create a JOIN table and use the `through` keyword
## Queries

- Know how to query your models/database to do the following:
    - Get all items
    - Get one item using an attribute/primary key
    - create an item
    - update an item (hint, there are two ways to do this)
    - delete an item
    - Know how to do advanced queries using:
        - Sequelize.Op commands
        - using `where`, `includes`, `through`, `attributes`
        - Know how to use built in Sequelize aggregate data commands (Ex: `count`, `min`, `max`)
        - query a one-to-many/many-to-many table/s
        - Know how to use `req.query` for things like pagination
