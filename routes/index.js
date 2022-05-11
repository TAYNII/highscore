var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
 
  const sql = `
          SELECT distinct on (game_id) 
                title,
                player,
                highscore,
                played_at,
                url_slug
          FROM score
          INNER JOIN game
          ON game.id = score.game_id
          ORDER BY game_id, highscore desc
  `;

  const db = req.app.locals.db;
  
  const result = await db.query(sql);

  res.render('index', { 
    title: 'Highscores',
    scores: result.rows
  });



});



module.exports = router;
