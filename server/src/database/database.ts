import mysql from "mysql2"
import * as dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise()

async function isEmailExists (email: string){
    try {
        const [data] = await pool.query(`
            SELECT * FROM members
            WHERE email = ?
        `,[email]);
        if (Array.isArray(data) && data.length === 0){
            return false;
        }else{
            return true;
        }
    } catch (error) {
        console.log("Error in isEmailExists function : ", error);
    }
    
}

async function createUser (username: string, email: string, hashedPassword: string){
    try {
        await pool.query(`
            INSERT INTO members (email, name, password) VALUES (?, ?, ?)
        `,[email, username, hashedPassword]); 
    } catch (error) {
        console.log(`
        Error while creating a new user in the database with this data :\n
        email : ${email}\n
        username: ${username}\n
        password : ${hashedPassword}\n
        -----------\n
        Error : ${error}
        `)
    }
    
}

export const db = {
    isEmailExists,
    createUser
}
