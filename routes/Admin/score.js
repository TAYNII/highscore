var express = require('express');
var router = express.Router();

// GET /admin/score/new
router.get('/new', async (req, res) => {

    const db = req.app.locals.db;

    const games = await getGames(db);

    res.render('admin/score/new', {
        title: 'Sök spel',
        games
    });
});

router.post('/new', async (req, res) => {

    const {
        player,
        played_at,
        highscore,
        game_id
    } = req.body;

    const newHighscore = {
        player,
        played_at,
        highscore,
        game_id
    };

    const db = req.app.locals.db;

    await saveHighscore(newHighscore, db);

    // Backend skickas en 302 Found till klient, 
    // tillsammans med en Location-header som 
    // kommer vara satt till värdet nedan, alltså
    // "/admin/products"
    res.redirect('/admin/games');
});




async function saveHighscore(newHighscore, db) {

    const sql = `
    INSERT INTO score (
        player,
        played_at,
        highscore,
        game_id
    ) VALUES ($1, $2, $3, $4)
    `;

    await db.query(sql, [
        newHighscore.player,
        newHighscore.played_at,
        newHighscore.highscore,
        newHighscore.game_id
    ]);

}

async function getGames(db) {

    const sql = `
                SELECT
                    id,
                    title,
                    to_char(release,'yyyy') as release,
                    genre,
                    url_slug
                FROM game
    `;

    const result = await db.query(sql);

    return result.rows;
}

module.exports = router;