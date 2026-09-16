require("dotenv").config();
const {Pool} = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: "postgres",
    port: process.env.DB_PORT,
    password: process.env.DB_PASS ,
    database: "MPLADS",
});

module.exports = pool;