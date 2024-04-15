
-- comment --


-- Create a table called tenants --
CREATE TABLE tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    unit_number INTEGER NOT NULL,
    rent INTEGER NOT NULL,
    due FLOAT(7,2) DEFAULT 0.00
);


-- Insert data values into the tenants table --
INSERT INTO tenants VALUES (
    1,
    "anthony",
    300,
    1000,
    0
);

INSERT INTO tenants VALUES (
    2,
    "sam",
    320,
    800,
    30
);

-- Look up data within the tenants table --
SELECT * FROM tenants;
SELECT id, first_name FROM tenants WHERE id=1; -- query data and onyl bring in id and first_naem
SELECT * FROM tenants WHERE id=1;


INSERT INTO tenants (first_name, unit_number, rent)
VALUES
("will", 400, 2000),
("bob", 500, 1700);

-- This will error out as we need to pass in all the fields --
-- since we arent specifying --
-- INSERT INTO tenants
-- VALUES
-- ("test", 700, 800);

-- More specific search
SELECT * FROM tenants WHERE due > 0;

UPDATE tenants SET due = 0 WHERE first_name="sam";

UPDATE tenants SET due = -1 WHERE first_name="sam";

DELETE FROM tenants WHERE id=4;


-- transaction > more advanced so disregard for now --

BEGIN TRANSACTION;

UPDATE tenants SET due = 0 WHERE first_name="sam";

DELETE FROM tenants WHERE id=2;

-- to revert run --
ROLLBACK

-- to commit --
COMMIT TRANSACTION
