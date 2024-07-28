import express, {Express} from "express"
import cors from "cors";
import body_parser from "body-parser"
import router from "./routes/router.js"
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    optionSuccessStatus: 200
};

const PORT: number = Number(process.env.SERVER_PORT);

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

app.use(cors(corsOptions));
app.use('/', router);

app.listen(PORT, () => {
    console.log("Server started on port " , PORT);
})