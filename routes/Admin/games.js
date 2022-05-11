var express = require('express');
var router = express.Router();

// GET /admin/games
router.get('/', async (req, res) => {

    const db = req.app.locals.db;

    const games = await getGames(db);

    res.render('admin/games', {
        title: 'Nytt spel',
        games
    });
});

// GET /admin/games/new
router.get('/new', async (req, res) => {

    res.render('admin/games/new', {
        title: 'Nytt spel',
     
    });
});

router.post('/new', async (req, res) => {

    const {
        title,
        description,
        image_url,
        release,
        genre
    } = req.body;

    const newGame = {
        title,
        description,
        image_url,
        release,
        genre,
        url_slug: generateURLSlug(title)
    };

    const db = req.app.locals.db;

    await saveGame(newGame, db);
    // Backend skickas en 302 Found till klient, 
    // tillsammans med en Location-header som 
    // kommer vara satt till värdet nedan, alltså
    // "/admin/products"
    res.redirect('/admin/games');
});

const generateURLSlug = (name) =>
    name.replace('-', '')
        .replace(' ', '-')
        .replace(' ', '-')
        .replace(' ', '-')
        .toLowerCase();


async function saveGame(newGame, db) {

    const sql = `
    INSERT INTO game (
        title,
        description,
        image_url,
        release,
        genre,
        url_slug
    ) VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await db.query(sql, [
        newGame.title,
        newGame.description,
        newGame.image_url,
        newGame.release,
        newGame.genre,
        newGame.url_slug
    ]);

}

async function getGames(db) {

    const sql = `
                SELECT id,
                    title,
                    to_char(release,'yyyy') as release,
                    genre,
                    url_slug,
                    image_url
                FROM game
    `;

    const result = await db.query(sql);

    return result.rows;
}

module.exports = router;