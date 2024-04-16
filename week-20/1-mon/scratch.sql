

-- comment --


CREATE TABLE tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    unit_number INTEGER NOT NULL,
    rent INTEGER NOT NULL,
    due FLOAT(6,2) DEFAULT 0.00
);

-- for float - 1st param -> how many numbers total --
-- for float - 2nd param -> how precise the decimals are

-- INSERT INTO tenants VALUES (
-- 1,
-- "anthony",
-- 300,
-- 1000,
-- 0.00
-- );


 -- CREATE DATA --
INSERT INTO tenants (first_name, unit_number, rent)
VALUES
("sam", 320, 800),
("bob", 321, 900),
("billy", 322, 820),
("jane", 323, 860),
("kate", 324, 910),
("will", 325, 1000)
;

-- look up data --

SELECT * FROM tenants; -- select all columns from tenants table
SELECT first_name, rent FROM tenants; -- select specified columns from tenants table
SELECT * FROM tenants WHERE rent >= 1000; -- use where clause to specify query


-- update --
UPDATE tenants SET due=800 WHERE id=2;

-- to delete data --

DELETE FROM tenants WHERE first_name="sam";


-- BEGIN TRANSACTION;

-- DROP TABLE tenants;

-- -- if we want to revert changes --

-- ROLLBACK;

-- -- IF WE WANT TO KEEP CHANGES --
-- COMMIT TRANSACTION;
