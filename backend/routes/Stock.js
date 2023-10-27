import express from "express";
import db from "../databases/mysql.js";
import { tableName } from "../const.js";

const stockRouter = express.Router();

stockRouter.post("/", (req, res) => {
  const query = `INSERT INTO ${tableName} (\`symbol\`, \`price\`, \`quantity\`, \`amount\`, \`status\`, \`userId\`) VALUES (?);`;
  const values = [
    req.body.symbol,
    req.body.price,
    req.body.quantity,
    req.body.amount,
    req.body.status,
    req.body.userId,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Stock has been created successfully");
  });
});

stockRouter.get("/:id", (req, res) => {
  const stockId = req.params.id;
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;

  db.query(query, [stockId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

stockRouter.delete("/:id", (req, res) => {
  const stockId = req.params.id;
  const userId = req.body.userId;
  const query = `DELETE FROM ${tableName} WHERE id = ${stockId} AND userId = '${userId}'`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json("Stock has been deleted successfully");
  });
});

stockRouter.put("/:id", (req, res) => {
  const stockId = req.params.id;
  const query = `UPDATE ${tableName} SET \`symbol\` = ?, \`price\` = ?, \`quantity\` = ?, \`amount\` = ?, \`status\` = ?, \`userId\` = ? WHERE id = ?`;
  const values = [
    req.body.symbol,
    req.body.price,
    req.body.quantity,
    req.body.amount,
    req.body.status,
    req.body.userId,
  ];

  db.query(query, [...values, stockId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Stock has been updated successfully");
  });
});

export default stockRouter;
