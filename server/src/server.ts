import express, {Express} from "express";
import cors from "cors";
import body_parser from "body-parser"
import router from "./routes/router"

const app: Express = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/', router)

const PORT: number = Number(process.env.SERVER_PORT);

app.listen(PORT, () => {
    console.log("Server started on port " , PORT);
})