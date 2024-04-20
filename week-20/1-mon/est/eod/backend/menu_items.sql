PRAGMA foreign_keys=ON;

-- Menu Item --

DROP TABLE IF EXISTS menu_items;

CREATE TABLE menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    price FLOAT(5, 2) NOT NULL,
    amount_sold INTEGER NOT NULL DEFAULT 0
);

-- check that table is inside of it > .tables or .schema --


INSERT INTO menu_items (name, price) VALUES
("burger", 10),
("burrito", 99),
("tacos", 2),
("guavo pastellito", 5.95),
("chicken sandwich", 7.50),
("cafecito", 2.45),
("sushi", .87),
("chicken alfredo", 12.95),
("carbonara spagehetti", 15.85),
("pepsi", 5.99)
;


-- check to make sure this item was created --

SELECT * FROM menu_items;

 -- manager wants us to get all the item names and their price  where price is greater than 5 --

-- SELECT name, price FROM menu_items WHERE price > 5;

-- name                  price
-- --------------------  -----
-- burger                10.0
-- burrito               99.0
-- guavo pastellito      5.95
-- chicken sandwich      7.5
-- chicken alfredo       12.95
-- carbonara spagehetti  15.85
-- pepsi                 5.99

 -- manager wants to update item with id 7, to be sold 10 times --

-- UPDATE menu_items SET amount_sold=10 WHERE id=7;


-- delete item 10 --

-- DELETE FROM menu_items WHERE id=10;

-- -- delete all items where amount_sold sold is 9 or less use a transaction --

-- BEGIN TRANSACTION;

-- DELETE FROM menu_items WHERE amount_sold <= 9;
-- -- DELETE FROM menu_items WHERE amount_sold < 10;

-- -- to undo transaction --
-- ROLLBACK;

-- -- to save transaction --
-- COMMIT;
