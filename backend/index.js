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
        // allow requests with no origin from postman
        if (!origin || origin.startsWith(process.env.FRONTEND_URL)) {
            return callback(null, true);
        }
        console.log("Blocked by CORS:", origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(mainRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})