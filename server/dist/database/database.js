import mysql from "mysql2/promise";
import * as dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
export const db = {
    isEmailExists,
    createUser,
    findUser,
    getPollsForUser,
    getPollData,
    createPoll,
    togglePollState,
    deletePoll,
    findPoll,
    findPollForVote,
    applyVote,
    getDashboardData
};
async function getDashboardData(userId) {
    function getTotalVotes(votes) {
        const totalVotes = Object.values(votes).reduce((acc, curr) => {
            acc = acc + curr;
            return acc;
        }, 0);
        return totalVotes;
    }
    const polls = await getPollsForUser(userId);
    const totalPolls = polls.length;
    const totalVotes = polls.reduce((acc, curr) => {
        acc = acc + getTotalVotes(curr.votes);
        return acc;
    }, 0);
    return { totalPolls, totalVotes };
}
async function isEmailExists(email) {
    try {
        const [data] = await pool.query(`
            SELECT * FROM members
            WHERE email = ?
        `, [email]);
        if (Array.isArray(data) && data.length === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        console.log("Error in isEmailExists function : ", error);
    }
}
async function createUser(id, username, email, hashedPassword) {
    try {
        await pool.query(`
            INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)
        `, [id, email, username, hashedPassword]);
        const user = await db.findUser(email);
        return user;
    }
    catch (error) {
        console.log(`
        Error while creating a new user in the database with this data :\n
        email : ${email}\n
        username: ${username}\n
        password : ${hashedPassword}\n
        -----------\n
        Error : ${error}
        `);
    }
}
async function findUser(email) {
    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE email = ?
    `, [email]);
    const userArray = rows;
    const user = userArray[0];
    return user;
}
async function getPollsForUser(userId) {
    const [rows] = await pool.query(`
        SELECT * FROM polls
        WHERE creator_id = ?    
    `, [userId]);
    const pollsArray = rows;
    return pollsArray;
}
async function getPollData(pollID) {
    const [rows] = await pool.query(`
        SELECT * FROM polls
        WHERE id = ?    
    `, [pollID]);
    const pollArray = rows;
    const poll = pollArray[0];
    return poll;
}
async function createPoll(creatorID, question, optionsJSON, pollID, urlToken, votesJSON) {
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
async function togglePollState(pollID, newState) {
    const [rows] = await pool.query(`
        UPDATE polls
        SET is_active = ?
        WHERE id = ?
    `, [newState, pollID]);
    const pollArray = rows;
    const poll = pollArray[0];
    return poll;
}
async function deletePoll(pollID) {
    await pool.query(`
        DELETE FROM polls
        WHERE id = ?    
    `, [pollID]);
}
async function findPoll(pollId) {
    const [rows] = await pool.query(`
        SELECT * FROM polls
        WHERE id = ?    
    `, [pollId]);
    const pollArray = rows;
    const poll = pollArray[0];
    return poll;
}
async function findPollForVote(urlToken) {
    const [rows] = await pool.query(`
        SELECT * FROM polls
        WHERE url_token = ?    
    `, [urlToken]);
    const pollArray = rows;
    const poll = pollArray[0];
    return poll;
}
async function applyVote(urlToken, selectedOption) {
    const poll = await findPollForVote(urlToken);
    if (!poll) {
        throw new Error('Poll not found');
    }
    const newVotes = { ...poll.votes };
    console.log(newVotes);
    if (newVotes[selectedOption] !== undefined) {
        newVotes[selectedOption] += 1;
    }
    else {
        newVotes[selectedOption] = 1;
    }
    const newVotesJSON = JSON.stringify(newVotes);
    await pool.query(`
        UPDATE polls 
        SET votes = ?
        WHERE url_token = ?
    `, [newVotesJSON, urlToken]);
    const updatedPoll = await findPollForVote(urlToken);
    return updatedPoll;
}
