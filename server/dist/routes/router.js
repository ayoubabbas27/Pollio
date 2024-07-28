import express from "express";
const router = express.Router();
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
