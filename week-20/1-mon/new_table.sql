CREATE TABLE my_new_tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    unit_number INTEGER NOT NULL,
    rent INTEGER NOT NULL,
    due FLOAT(7,2) DEFAULT 0.00
);
