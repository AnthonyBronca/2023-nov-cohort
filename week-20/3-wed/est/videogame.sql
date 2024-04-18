PRAGMA foreign_keys = ON
-- drop commands to read the file better --

DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS spells;
DROP TABLE IF EXISTS player_spells;


-- MANY-TO-MANY EXAMPLE FILE --

-- create a table for players --
CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(15) NOT NULL UNIQUE
);


-- create a table for spells --

CREATE TABLE spells (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    spell_name VARCHAR(30) NOT NULL,
    spell_description VARCHAR(255)
);


-- CREATE THE JOIN TABLE called player_spells --

CREATE TABLE player_spells (
    player_id INTEGER,
    spell_id INTEGER,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (spell_id) REFERENCES spells(id)
);
-- GOOD CODE FOR CASCADE --

-- CREATE TABLE player_spells (
--     player_id INTEGER,
--     spell_id INTEGER,
--     FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
--     FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE
-- );

-- create some dummy data for each of the tables --

INSERT INTO players (username) VALUES
("mywizard"),
("darkwizard"),
("overload3000"),
("n00bPwner"),
("pkGod");

SELECT * FROM players;
-- id  username
-- --  ------------
-- 1   mywizard
-- 2   darkwizard
-- 3   overload3000
-- 4   n00bPwner
-- 5   pkGod

select * from spells;

-- id  spell_name       spell_description
-- --  ---------------  ------------------------------------------------------------
-- 1   fireball         shoots fire at enemies. Does 15 damage per second on burn
-- 2   blizzard         launches AOE spell with falling icicles. Change to freeze en
--                      emy
-- 3   water rush       stream water from your palms to sweep away target
-- 4   lightning storm  create a storm of lightning that lasts for 30 seconds with a
--                       change to paralyze target
-- 5   dark matter      one shot noobs with dark matter
-- 6   light matter     prevent the use of dark matter



INSERT INTO spells (spell_name, spell_description) VALUES
("fireball", "shoots fire at enemies. Does 15 damage per second on burn"),
("blizzard", "launches AOE spell with falling icicles. Change to freeze enemy"),
("water rush", "stream water from your palms to sweep away target"),
("lightning storm", "create a storm of lightning that lasts for 30 seconds with a change to paralyze target"),
("dark matter", "one shot noobs with dark matter"), -- >delete this
("light matter", "prevent the use of dark matter");



INSERT INTO player_spells VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 1),
(3, 5),
(4, 5),
(4, 1),
(4, 2),
(4, 3),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(5, 6);


-- QUERY MANY TO MANY: get all the users and their spells --


SELECT
    players.username,
    spells.spell_name
FROM
    players -- notice we are grabbing from the players table
JOIN
    player_spells ON players.id = player_spells.player_id
JOIN
    spells ON player_spells.spell_id = spells.id;

-- username      spell_name
-- ------------  ---------------
-- mywizard      fireball
-- mywizard      blizzard
-- mywizard      water rush
-- darkwizard    blizzard
-- darkwizard    fireball
-- overload3000  dark matter
-- n00bPwner     dark matter
-- n00bPwner     fireball
-- n00bPwner     blizzard
-- n00bPwner     water rush
-- pkGod         fireball
-- pkGod         blizzard
-- pkGod         water rush
-- pkGod         lightning storm
-- pkGod         dark matter
-- pkGod         light matter



-- CASCADE DELETE --

DELETE FROM spells WHERE id=5;
SELECT * FROM player_spells;
