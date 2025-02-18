import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import mainRouter from "./routes/mainRouter.js";
import connectDB from "./config/db.js";
import pino from 'pino';
import { pinoHttp } from 'pino-http';
configDotenv();

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty'
    },
});

const port = process.env.PORT || 3000;
const app = express();
connectDB();

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

app.use(pinoHttp({ logger }));

app.use(mainRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

export {
    logger
};