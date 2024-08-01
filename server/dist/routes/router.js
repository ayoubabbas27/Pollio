import express from "express";
import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
const maxAge = Number(process.env.JWT_MAX_AGE_SECONDS);
async function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}
router.post('/api/sign_up', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (await db.isEmailExists(email)) {
            res.json({
                success: false,
                message: "Error : This email was already used before",
            });
        }
        else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const id = uuidv4();
            const newUser = await db.createUser(id, username, email, hashedPassword);
            const token = await createToken(newUser?.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure: false });
            res.json({
                success: true,
                user: newUser,
                token
            });
        }
    }
    catch (error) {
        console.log('Error in the backend api for user sign up : ', error);
        res.json({
            success: false,
            message: "Error : Internal server error, try again later.",
        });
    }
});
router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.findUser(email);
        if (user) {
            const auth = await bcrypt.compare(password, user?.password);
            if (auth) {
                const token = await createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure: false });
                res.status(200).json({ user, token });
            }
            else {
                res.status(400).json('Incorrect password');
                // throw Error('Incorrect password');
            }
        }
        else {
            res.status(400).json('Incorrect email');
            // throw Error('Incorrect email');
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.get('/api/dashboard', async (req, res) => {
    const userId = req.query.userId;
    const { totalPolls, totalVotes } = await db.getDashboardData(userId);
    res.json({ totalPolls, totalVotes });
});
router.get('/api/my_polls', async (req, res) => {
    const userId = req.query.userId;
    const pollsData = await db.getPollsForUser(userId);
    res.json(pollsData);
});
router.patch('/api/my_polls/toggleState', async (req, res) => {
    const { pollID, newState } = req.body;
    const poll = await db.togglePollState(pollID, newState);
    res.json(poll);
});
router.post('/api/my_polls/new', async (req, res) => {
    const { creatorID, question, options } = req.body;
    const pollID = uuidv4();
    const urlToken = uuidv4();
    const optionsJSON = JSON.stringify(options);
    const votes = options.reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
    }, {});
    const votesJSON = JSON.stringify(votes);
    const newPoll = await db.createPoll(creatorID, question, optionsJSON, pollID, urlToken, votesJSON);
    console.log(newPoll);
    res.json(newPoll);
});
router.delete('/api/my_polls/delete', async (req, res) => {
    const pollID = req.query.pollID;
    console.log('pollID : ', pollID);
    await db.deletePoll(pollID);
});
router.get('/api/my_polls/details', async (req, res) => {
    const pollId = req.query.pollId;
    console.log(pollId);
    const poll = await db.findPoll(pollId);
    res.json(poll);
});
router.get('/api/polls/vote', async (req, res) => {
    const urlToken = req.query.urlToken;
    console.log(urlToken);
    const poll = await db.findPollForVote(urlToken);
    res.json(poll);
});
router.post('/api/polls/vote/action', async (req, res) => {
    const { urlToken, selectedOption } = req.body;
    const poll = await db.applyVote(urlToken, selectedOption);
    res.json(poll);
});
export default router;
