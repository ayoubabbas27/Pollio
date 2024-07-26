import express from "express";
import cors from "cors";
import body_parser from "body-parser";
import router from "./routes/router";
const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use('/', router);
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server started on port ", PORT);
});
