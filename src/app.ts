import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import userRoute from "./routes/user.route";


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);

export default app;
