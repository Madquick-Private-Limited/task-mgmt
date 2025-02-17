import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import mainRouter from "./routes/mainRouter.js";
configDotenv();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: function (origin, callback) {
        if (origin.startsWith(process.env.FRONTEND_URL)) {
            callback(null, true)
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));
app.use(mainRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})