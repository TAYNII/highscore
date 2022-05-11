var express = require('express');
var router = express.Router();

// GET http://localhost:3000/games/tetris (URI-segment)
router.get('/:urlSlug', async function(req, res) {
 

  const urlSlug = req.params.urlSlug;

  const db = req.app.locals.db;
  

  const sql = `
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
            ORDER BY played_at desc fetch first 10 rows only
  `;

  const result = await db.query(sql, [urlSlug]);
  const game = result.rows[0];
  


  res.render('games/details', { 
    title: game.title,
    game,
    allScores: result.rows
  });
});



module.exports = router;