import express from "express";
import { db } from "../database/database.js";
import bcrypt from "bcrypt";
const router = express.Router();
router.post('/api/sign_up', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (await db.isEmailExists(email)) {
            res.json({
                success: false,
                message: "This email was already used before"
            });
        }
        else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            res.json({
                username,
                email,
                hashedPassword
            });
            await db.createUser(username, email, hashedPassword);
        }
    }
    catch (error) {
        console.log('Error in the backend api for user sign up : ', error);
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
