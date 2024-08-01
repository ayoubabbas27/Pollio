import express, {Router, Request, Response} from "express"
import { db } from "../database/database.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const maxAge: number = Number(process.env.JWT_MAX_AGE_SECONDS);

async function createToken (id: string){
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn:  maxAge
    })
}

router.post('/api/sign_up', async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        if (await db.isEmailExists(email)){
            res.json({
                success: false,
                message: "Error : This email was already used before",
            })
        }else{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const id = uuidv4();

            const newUser = await db.createUser(id, username, email, hashedPassword);
            const token = await createToken(newUser?.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 , secure: false});
            res.json({
                success: true,
                user: newUser,
                token
            })
        }
    } catch (error) {
        console.log('Error in the backend api for user sign up : ', error);
        res.json({
            success: false,
            message: "Error : Internal server error, try again later.",
        })
    }
})

router.post('/api/login', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await db.findUser(email);
        if (user){
            const auth = await bcrypt.compare(password, user?.password);
            if (auth) {
                const token = await createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 , secure: false});
                
                res.status(200).json({user , token});
            }else{
                res.status(400).json('Incorrect password');
                // throw Error('Incorrect password');
            }
        }else{
            res.status(400).json('Incorrect email');
            // throw Error('Incorrect email');
        }
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/api/dashboard', async (req: Request, res: Response) => {
    res.json("dashboard data extracted from the DB");
});

router.get('/api/my_polls', async (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    const pollsData = await db.getPollsForUser(userId);
    res.json(pollsData);
});

router.post('/api/my_polls/new', async (req: Request, res: Response) => {
    const { creatorID, question, options } = req.body;
    const pollID = uuidv4();
    const urlToken = uuidv4();
    const optionsJSON = JSON.stringify(options);

    type Votes = Record<string, number>

    const votes = options.reduce((acc: Votes, curr: string) => {
        acc[curr] = 0;
        return acc;
    }, {});

    const votesJSON = JSON.stringify(votes);

    const newPoll = await db.createPoll(creatorID, question, optionsJSON, pollID, urlToken, votesJSON);

    console.log(newPoll);

    res.json(newPoll);
});


export default router;