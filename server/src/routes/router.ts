import express, {Router, Request, Response} from "express"

const router: Router = express.Router();

router.get('/api', (req: Request, res: Response) => {
    res.json({"fruits": ["apple", "orange", "pineapple"]});
});

export default router