import express from "express";
const router = express.Router();
router.get('/api', (req, res) => {
    res.json({ "fruits": ["apple", "orange", "pineapple"] });
});
export default router;
