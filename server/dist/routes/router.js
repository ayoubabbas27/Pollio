import express from "express";
import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
            const newUser = await db.createUser(username, email, hashedPassword);
            const token = await createToken(newUser?.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure: false });
            res.json({
                success: true,
                userId: newUser?.id,
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
                res.status(200).json({ user: user.id, token });
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
router.get('/api/dashboard', (req, res) => {
    res.json("dashboard data extracted from the DB");
});
router.get('/api/my_polls', (req, res) => {
    res.json("Polls data information");
});
router.get('/api/teams', (req, res) => {
    res.json("Teams data information");
});
router.get('/api/polling_requests', (req, res) => {
    res.json("Polling Requests data information");
});
export default router;
