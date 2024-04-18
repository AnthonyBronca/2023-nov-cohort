
-- One-to-many example --


-- create the users table --

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(55) NOT NULL UNIQUE,
    username VARCHAR(15) NOT NULL UNIQUE
);


-- create seed data for users --

INSERT INTO users (first_name, last_name, email, username) VALUES
("demo", "man", "demo@test.io", "demoman"),
("anthony", "bronca", "abronca@test.io", "abronca"),
("sam", "bae", "sbae@test.io", "sbae"),
("will", "duffy", "wduffy@test.io", "wduffy"),
("spongebob", "squarepants", "sbsp@bikinbottom.io", "goofygoober");

-- create a table for posts --

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post VARCHAR(180) NOT NULL,
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    -- foreign refences --
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO posts (post, user_id) VALUES
("hello world", 1),
("what's up", 2),
("My first post", 3),
("Hey everyone!", 4),
("I'm ready!", 5);

-- regular queries --
SELECT * FROM users;
SELECT * FROM posts;

-- relationship queries --
-- BAD EXAMPLE --
SELECT post, users.username FROM posts INNER JOIN users;
-- post           username
-- -------------  -----------
-- hello world    abronca
-- hello world    demoman
-- hello world    goofygoober
-- hello world    sbae
-- hello world    wduffy
-- what's up      abronca
-- what's up      demoman
-- what's up      goofygoober
-- what's up      sbae
-- what's up      wduffy
-- My first post  abronca
-- My first post  demoman
-- My first post  goofygoober
-- My first post  sbae
-- My first post  wduffy
-- Hey everyone!  abronca
-- Hey everyone!  demoman
-- Hey everyone!  goofygoober
-- Hey everyone!  sbae
-- Hey everyone!  wduffy
-- I'm ready!     abronca
-- I'm ready!     demoman
-- I'm ready!     goofygoober
-- I'm ready!     sbae
-- I'm ready!     wduffy

SELECT post, users.username FROM posts INNER JOIN users ON posts.user_id = users.id;

-- post           username
-- -------------  -----------
-- hello world    demoman
-- what's up      abronca
-- My first post  sbae
-- Hey everyone!  wduffy
-- I'm ready!     goofygoober
