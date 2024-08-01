import mysql from "mysql2/promise"
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export const db = {
    isEmailExists,
    createUser,
    findUser,
    getPollsForUser,
    getPollData,
    createPoll
}

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

async function createUser (id: string, username: string, email: string, hashedPassword: string){
    try {
        await pool.query(`
            INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)
        `,[id, email, username, hashedPassword]); 
        const user = await db.findUser(email);
        return user;
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

async function findUser (email: string) {
    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE email = ?
    `,[email]);
    const userArray = rows as mysql.RowDataPacket[];
    const user = userArray[0];
    return user;
}

async function getPollsForUser (userId: string){
    const [rows] = await pool.query(`
        SELECT * FROM polls
        WHERE creator_id = ?    
    `, [userId]);
    const pollsArray = rows as mysql.RowDataPacket[]
    return pollsArray;
}

async function getPollData (pollID: string){
    const [rows] = await pool.query(`
        SELECT * FROM polls
        WHERE id = ?    
    `, [pollID]);
    const pollArray = rows as mysql.RowDataPacket[];
    const poll = pollArray[0];
    return poll;
}

async function createPoll (creatorID: string, question: string, optionsJSON: string, pollID: string, urlToken: string, votesJSON: string){
    await pool.query(`
        INSERT INTO polls (
            id,
            question,
            options,
            votes,
            url_token,
            creator_id
        ) VALUES (?, ?, ?, ?, ?, ?) 
    `, [pollID, question, optionsJSON, votesJSON, urlToken, creatorID]);
    const newPoll = await getPollData(pollID);
    return newPoll;
}
