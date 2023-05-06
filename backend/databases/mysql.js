import mysql from 'mysql';

import * as dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
})

db.getConnection((err) => {
    if (err) throw err;
    console.log("MySQL Database is connected Successfully");
});

export default db