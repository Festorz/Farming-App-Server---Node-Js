import mysql from 'mysql';
import pg from 'pg';
import dotenv from 'dotenv'

// commands
// sudo /opt/lampp/lampp start / stop
export const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Mkulima_app'
})

// database.connect(function (err) {
//     if (err) {
//         console.log('Error in connection')
//         console.log(err);
//     } else {
//         console.log('Database connected')
//     }
// });


// commamd
//  sudo -u developer psql -d mkulima

dotenv.config()

// export const pool = new pg.Pool({
//     user: 'developer',
//     host: 'localhost',
//     database: 'mkulima',
//     password: 'fkkirui97',
//     port: 5432
// });

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `
postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

export const pool = new pg.Pool({
  connectionString: isProduction ? process.env.DATABASE_URL :
  connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
pool.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL, 
    username VARCHAR(250),
    phone VARCHAR(50),
    email VARCHAR(250),
    country VARCHAR(250),
    town VARCHAR(250),
    password VARCHAR(200),
    premium boolean DEFAULT 'false',
    market boolean DEFAULT 'false',
    upload boolean DEFAULT 'false',
    diagnose boolean DEFAULT 'false',
    UNIQUE (username, email),
    transactionID VARCHAR(250),    
    PRIMARY KEY (username)
    )

    `, (err, res) => {
    // console.log(err, res)
    // pool.end();
});

pool.query(`CREATE TABLE IF NOT EXISTS products(
    username VARCHAR(250),
    id SERIAL PRIMARY KEY, 
    title VARCHAR(250),
    price int, 
    quantity VARCHAR(250),
    description TEXT,
    country VARCHAR(250),
    location VARCHAR(250),
    type VARCHAR(250),
    phone VARCHAR(250),
    addedDate TIMESTAMPTZ,
    market boolean DEFAULT 'false',
    premium boolean DEFAULT 'false',
    verified boolean DEFAULT 'false',
    imageFile TEXT,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE)
    `, (err, res) => {
    // console.log(err, res)
    // pool.end();
});

pool.query(`CREATE TABLE IF NOT EXISTS records(
    username VARCHAR(250),
    id SERIAL PRIMARY KEY, 
    title VARCHAR(250),
    description TEXT,
    expense int, 
    profit int,
    plans TEXT,
    addedDate TIMESTAMPTZ,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE)
    `, (err, res) => {
    // console.log(err, res)
    // pool.end();
});

pool.query(`CREATE TABLE IF NOT EXISTS mpesa(
    id SERIAL PRIMARY KEY, 
    transactionID VARCHAR(250),
    phoneNumber VARCHAR(250),
    amount int, 
    transactionDate VARCHAR(250),
    receiptNumber VARCHAR(250))
    `, (err, res) => {
    // console.log(err, res)
    // pool.end();
});
