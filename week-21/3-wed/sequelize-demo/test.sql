
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL
);


INSERT INTO users (first_name, last_name, email, password)
VALUES ("anthony", "bronca", "abronca@test.io", "password");

SELECT * FROM users;
