
-- ONE TO MANY CODE EXAMPLE --

-- Optional: code to drop database if it exists --

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

-- create the users table --

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email varchar(55) NOT NULL UNIQUE,
    username VARCHAR(15) NOT NULL UNIQUE
);

-- create seeders for users --

INSERT INTO users (first_name, last_name, email, username) VALUES
("demo", "man", " demo@demoman.io", "demoman"),
("anthony", "bronca", " abronca@demo.io", "abronca"),
("sam", "bae", " sbae@demo.io", "sbae");

-- create the tweets table --

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post VARCHAR(180) NOT NULL,
    user_id INTEGER, -- <- NOTE THIS WILL BE OUR FK BUT WE DO NOT MAKE THE RELATIONSHIP HERE YET
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    -- RELATIONSHIP --
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO posts (post, user_id) VALUES
("hello world", 1),
("How are you all", 2),
("My first post", 3);

--


-- regular queries --
SELECT * FROM posts;
SELECT * FROM users;

-- Query from table to table -> what makes a one-to-many relationship so cool --

-- Example of BAD RELATIONSHIP QUERY --
SELECT post, users.username FROM posts INNER JOIN users;

-- outputs data like this --
-- post             username
-- ---------------  --------
-- hello world      abronca
-- hello world      demoman
-- hello world      sbae
-- How are you all  abronca
-- How are you all  demoman
-- How are you all  sbae
-- My first post    abronca
-- My first post    demoman
-- My first post    sbae

-- EXAMPLE of GOOD RELATIONSHIP QUERY --
SELECT post, users.username FROM posts INNER JOIN users ON posts.user_id = users.id;


-- post             username
-- ---------------  --------
-- hello world      demoman
-- How are you all  abronca
-- My first post    sbae
