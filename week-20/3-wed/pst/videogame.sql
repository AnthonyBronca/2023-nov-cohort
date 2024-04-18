

-- Many-to-many example


-- player, spells, player_spells --

CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(15) NOT NULL
);

CREATE TABLE spells (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    spell_name VARCHAR(30) NOT NULL,
    spell_description VARCHAR(255)
);

CREATE TABLE player_spells (
    player_id INTEGER,
    spell_id INTEGER,
    -- relationships --
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (spell_id) REFERENCES spells(id)
);


-- seed data --

INSERT INTO players (username) VALUES
("mywizard"),
("darkwizard"),
("overlord3000"),
("n00bpwner"),
("pkGod");

INSERT INTO spells (spell_name, spell_description) VALUES
("fireball", "shoots fire at enemies. Does 15 damage per second on burn"),
("blizzard", "launches AOE spell with falling icicles. Change to freeze enemy"),
("water rush", "stream water from your palms to sweep away target"),
("lightning storm", "create a storm of lightning that lasts for 30 seconds with a change to paralyze target"),
("dark matter", "one shot noobs with dark matter"),
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


-- get the players --
SELECT * FROM players;

-- id  username
-- --  ------------
-- 1   mywizard
-- 2   darkwizard
-- 3   overlord3000
-- 4   n00bpwner
-- 5   pkGod

-- get all the spells --
SELECT * FROM spells;

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


-- get the spells that belong to each user --

SELECT
    players.username,
    spells.spell_name
FROM
    players
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
-- overlord3000  dark matter
-- n00bpwner     dark matter
-- n00bpwner     fireball
-- n00bpwner     blizzard
-- n00bpwner     water rush
-- pkGod         fireball
-- pkGod         blizzard
-- pkGod         water rush
-- pkGod         lightning storm
-- pkGod         dark matter
-- pkGod         light matter
