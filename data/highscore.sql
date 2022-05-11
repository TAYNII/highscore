CREATE DATABASE Highscore;

CREATE TABLE game (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(50) NOT NULL,
  release DATE NOT NULL,
  genre VARCHAR NOT NULL,
  description VARCHAR(500) NOT NULL,
  url_slug VARCHAR(50) NOT NULL,
  image_url VARCHAR(250) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (title)
);

INSERT INTO game (
title,
release,
genre,
description,
url_slug,
image_url
) VALUES
(
'Tetris',
'1984-06-06',
'Puzzle',
'Tetris är ett dator- och TV-spel som går ut på att ordna olika fallande figurer.',
'tetris',
'https://play-lh.googleusercontent.com/za2Nu_qjMw5GzWfbzet4zeiZT1xvJlTRi4NJzGpJWX9grxFAAko5dGBwe7qeqK01THw'
);

INSERT INTO game (
title,
release,
genre,
description,
url_slug,
image_url
) VALUES
(
'Pac-Man',
'1980-05-22',
'Maze',
'Pac-Man är ett labyrint spel.',
'pacman',
'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Pac-man.png/220px-Pac-man.png'
);

INSERT INTO game (
title,
release,
genre,
description,
url_slug,
image_url
) VALUES
(
'Donkey Kong',
'1981-07-09',
'Plattform',
'Donkey Kong är ett arkadspel av plattfomstyp.',
'donkey-kong',
'https://upload.wikimedia.org/wikipedia/en/1/14/Donkey_Kong_flier.jpg'
);

INSERT INTO game (
title,
release,
genre,
description,
url_slug,
image_url
) VALUES
(
'Asteroids',
'1979-11-01',
'Space combat',
'Asteroids är ett arkadspel',
'asteroids',
'https://images.saymedia-content.com/.image/t_share/MTc0MDExMjc3NTI4NTQxMDUx/asteroids-game.jpg'
);

INSERT INTO game (
title,
release,
genre,
description,
url_slug,
image_url
) VALUES
(
'Cabal',
'2005-11-01',
'MMORPG',
'Cabal Online är ett gratis-att-spela, massivt 3D-rollspel online-rollspel',
'cabal',
'https://i.pinimg.com/736x/6d/8d/c1/6d8dc1fa4f5385b7e0295ebf4b5217e6.jpg'
);

CREATE TABLE score (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  player VARCHAR(50) NOT NULL,
  played_at DATE NOT NULL,
  highscore BIGSERIAL NOT NULL,
  game_id INTEGER,
  FOREIGN KEY (game_id)
  REFERENCES game (id),
  PRIMARY KEY (id)
);

INSERT INTO score (
  player_name,
  played_at,
  highscore,
  game_id
) VALUES (
  'John Doe',
  '2022-03-05',
  '2456876543234',
  '1'
)

INSERT INTO score (
  player,
  played_at,
  highscore,
  game_id
) VALUES (
  'Mary Doe',
  '2022-04-22',
  '345678987654',
  '1'
)

INSERT INTO score (
  player,
  played_at,
  highscore,
  game_id
) VALUES (
  'Sia Doe',
  '2022-04-22',
  '764345645',
  '2'
)

select distinct on (game_id) 
title,
player,
highscore,
played_at
from score
INNER JOIN game
 ON game.id = score.game_id
order by game_id, highscore desc

SELECT 
  title,
  description,
  image_url,
  to_char(release,'yyyy') as release,
  genre,
  url_slug,
  player,
  to_char(played_at,'yyyy-mm-dd') as played_at,
  highscore
FROM game
LEFT JOIN score
ON score.game_id = game.id
WHERE url_slug = $1
ORDER BY highscore desc fetch first 10 rows only

