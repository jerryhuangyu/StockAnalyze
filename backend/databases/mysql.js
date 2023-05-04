import mysql from 'mysql';

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "jerry",
//     password: "sudohuang",
//     database: "stock",
// })

const db = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "bd1764d63736e4",
    password: "579ee152",
    database: "heroku_2d015e3987de5c9",
    connectionLimit: 10,
})

db.getConnection((err) => {
    if (err) throw err;
    console.log("MySQL Database is connected Successfully");
});

export default db