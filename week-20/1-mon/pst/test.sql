DROP TABLE IF EXISTS test_tenants;

CREATE TABLE test_tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    unit_number INTEGER NOT NULL,
    rent INTEGER NOT NULL,
    due FLOAT(6,2) DEFAULT 0.00
);
