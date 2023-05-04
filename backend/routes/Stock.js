import express from 'express';
import db from '../databases/mysql.js';

const stockRouter = express.Router();

stockRouter.post('/', (req, res) => {
    const query = "INSERT INTO olulu (`symbol`, `price`, `quantity`, `amount`, `status`) VALUES (?);";
    const values = [
        req.body.symbol,
        req.body.price,
        req.body.quantity,
        req.body.amount,
        req.body.status
    ]

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Stock has been created successfully");
    })
});

stockRouter.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "SELECT * FROM olulu WHERE id = ?";

    db.query(query, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

stockRouter.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM olulu WHERE id = ?";

    db.query(query, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Stock has been deleted successfully");
    })
});

stockRouter.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "UPDATE olulu SET `symbol` = ?, `price` = ?, `quantity` = ?, `amount` = ?, `status` = ? WHERE id = ?";
    const values = [
        req.body.symbol,
        req.body.price,
        req.body.quantity,
        req.body.amount,
        req.body.status
    ]

    db.query(query, [...values, bookId], (err, data) => {
        console.log(err);
        if (err) return res.json(err);
        return res.json("Stock has been updated successfully");
    })
});

export default stockRouter