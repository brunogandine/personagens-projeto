import express from "express"
import cors from "cors"
import helmet from "helmet"
import apiRouter from "./routes/api";
import cookieParser from 'cookie-parser';
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(helmet({
    crossOriginResourcePolicy: false
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")))

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})