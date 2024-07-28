import express, {Router, Request, Response} from "express"

const router: Router = express.Router();

router.get('/api/dashboard', (req: Request, res: Response) => {
    res.json("dashboard data extracted from the DB");
});

router.get('/api/my_polls', (req: Request, res: Response) => {
    res.json("Polls data information");
});

router.get('/api/teams', (req: Request, res: Response) => {
    res.json("Teams data information");
});

router.get('/api/polling_requests', (req: Request, res: Response) => {
    res.json("Polling Requests data information");
});



export default router;