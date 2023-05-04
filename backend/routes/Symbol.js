import express from 'express';
import db from '../databases/mysql.js';

const symbolRouter = express.Router();

symbolRouter.get('/:symbol', (req, res) => {
    const symbol = req.params.symbol;
    const query = 'SELECT * FROM olulu WHERE symbol = ?';

    db.query(query, [symbol], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

export default symbolRouter;