import express from 'express';
import db from '../databases/mysql.js';

const stocksRouter = express.Router();

stocksRouter.get('/', (req, res) => {
    const query = "SELECT * FROM olulu;";

    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

stocksRouter.get('/category', (req, res) => {
    const query = 'SELECT DISTINCT symbol FROM olulu';

    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

stocksRouter.get('/lastsix', (req, res) => {
    const query = "SELECT * FROM olulu ORDER BY id DESC LIMIT 6;";

    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

export default stocksRouter;