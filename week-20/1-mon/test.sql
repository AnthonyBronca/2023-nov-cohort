CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    age INTEGER
);

INSERT INTO users (first_name, last_name, age)
VALUES ("spongebob", "squarepants", 24);

INSERT INTO users (first_name, last_name, age)
VALUES ("patrick", "star", 25);

INSERT INTO users (first_name, last_name, age)
VALUES ("squidward", "tentacles", 30);

INSERT INTO users (first_name, last_name, age)
VALUES ("eugene", "Krabs", 45);

INSERT INTO users (first_name, last_name, age)
VALUES ("sheldon", "plankton", 45);

INSERT INTO users (first_name, last_name, age)
VALUES ("mrs.", "puff", 42);
