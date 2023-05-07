import express from 'express';
import db from '../databases/mysql.js';

const stocksRouter = express.Router();

stocksRouter.get('/', (req, res) => {
    const query = "SELECT * FROM olulu ORDER BY id DESC;";

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

stocksRouter.get('/value/transaction', (req, res) => {
    const query = "SELECT COUNT(id) as idcount FROM olulu;";

    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

stocksRouter.get('/value/dailyvolume', (req, res) => {
    const query = "SELECT COUNT(*) as volumecount FROM olulu WHERE DATE(createdate) = CURDATE();";

    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

export default stocksRouter;