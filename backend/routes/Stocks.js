import express from "express";
import db from "../databases/mysql.js";
import { tableName } from "../const.js";

const stocksRouter = express.Router();

stocksRouter.get("/", (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT * FROM ${tableName} WHERE userId = '${userId}' ORDER BY id DESC;`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

stocksRouter.get("/category", (req, res) => {
  const query = `SELECT DISTINCT symbol FROM ${tableName}`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

stocksRouter.get("/lastsix", (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT * FROM ${tableName} WHERE userId = '${userId}' ORDER BY id DESC LIMIT 6;`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

stocksRouter.get("/value/transaction", (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT COUNT(id) as idcount FROM ${tableName} WHERE userId = '${userId}';`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

stocksRouter.get("/value/dailyvolume", (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT COUNT(*) as volumecount FROM ${tableName} WHERE DATE(createdate) = CURDATE() AND userId = '${userId}';`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

export default stocksRouter;
