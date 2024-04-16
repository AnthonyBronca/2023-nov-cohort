
-- Create menu_items so that we can store information and start our restaunt

CREATE TABLE menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    price FLOAT(5,2) NOT NULL,
    amount_sold INTEGER DEFAULT 0 NOT NULL
);

 -- add menu items -> add 10 items

 INSERT INTO menu_items (name, price)
 VALUES
 ("burrito", 9.50),
 ("burger", 5.50),
 ("ribeye steak", 59.95),
 ("steak", 22.50),
 ("pizza", 14.98),
 ("truffle fries", 5.00),
 ("ice cream sandwich", 4.30),
 ("cheese cake", 10.00),
 ("birria tacos", 9.99),
 ("lava cake", 20.45)
 ;


-- command to search for all items within a table --
SELECT * FROM menu_items;


-- id  name                price  amount_sold
-- --  ------------------  -----  -----------
-- 1   burrito             9.5    0
-- 2   burger              5.5    0
-- 3   ribeye steak        59.95  0
-- 4   steak               22.5   0
-- 5   pizza               14.98  0
-- 6   truffle fries       5.0    0
-- 7   ice cream sandwich  4.3    0
-- 8   cheese cake         10.0   0
-- 9   birria tacos        9.99   0
-- 10  lava cake           20.45  0


-- query to search for item that are priced higher than $5.00, only get name and price --

SELECT name,price FROM menu_items WHERE  price > 5.00;

-- name          price
-- ------------  -----
-- burrito       9.5
-- burger        5.5
-- ribeye steak  59.95
-- steak         22.5
-- pizza         14.98
-- cheese cake   10.0
-- birria tacos  9.99
-- lava cake     20.45


-- update item 7 to be sold 10 times --

UPDATE menu_items SET amount_sold = 10 WHERE id = 7;


-- delete lava cake from the menu --

DELETE FROM menu_items WHERE id=10;

-- transaction -> then delete all items where amount_sold is 9 or less --


BEGIN TRANSACTION;

DELETE FROM menu_items WHERE amount_sold <= 9;

SELECT * FROM menu_items;

-- REVERT CHANGE --
ROLLBACK;

-- keep the change --

COMMIT TRANSACTION;
