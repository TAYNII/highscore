var express = require('express');
var router = express.Router();


// GET http://localhost:3000/search?q=svart
router.get('/', async function(req, res) {
 
  const searchTerm = req.query.q;
  
  const db = req.app.locals.db;

  const sql = `
    SELECT title,
          release,
          genre,
          url_slug,
          image_url
      FROM game
      WHERE title ILIKE '%' || $1 || '%'
  `;

  

  const result = await db.query(sql, [searchTerm]);

  res.render('search', { 
    title: 'Sökresultat',
    games: result.rows,
    searchTerm
  });
});

module.exports = router;
