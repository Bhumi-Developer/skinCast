import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import db from './config/db.js';
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.routes.js';
// import recommedRouter from './routes/recommendation.routes.js';
// import productRouter from './routes/product.routes.js';
// import userRouter from './routes/user.routes.js';



const app = express();

app.use(cookieParser());

const port = process.env.PORT || 4000;
db()

app.use(cors(
   {
        origin: process.env.TRUSTED_ORIGINS,
        credentials: true,
    }
))


app.use(express.json({limit: '50mb'}))

app.use("/api/auth",authRouter)
// app.use("/api/recommendation",recommedRouter)
// app.use("/api/product", productRouter);
// app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});