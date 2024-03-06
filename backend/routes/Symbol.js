import express from "express";
import db from "../databases/mysql.js";
import { tableName } from "../const.js";

const symbolRouter = express.Router();

symbolRouter.get("/:symbol", (req, res) => {
  const symbol = req.params.symbol;
  const userId = req.body.userId;
  const query = `SELECT * FROM ${tableName} WHERE symbol = ? AND userId = '${userId}'`;

  db.query(query, [symbol], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

export default symbolRouter;
