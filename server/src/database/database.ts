import mysql from "mysql2"
import * as dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise()

async function getMemberData (){
    const [data] = await db.query(`SELECT * FROM members`);
    return data;
}

 
const member = await getMemberData()
console.log('query result : ', member);