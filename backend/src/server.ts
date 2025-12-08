import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import cors from "cors"
import helmet from "helmet"
import apiRouter from "./routes/api";
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`[REQ] ${req.method} ${req.url}`, req.body);
    next();
});

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})