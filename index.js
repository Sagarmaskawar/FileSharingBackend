import  express  from "express";
import mongoose from "mongoose";
import router from "./router/routes.js";
import cors from 'cors';
import DbConnection from "./Database/db.js";
const app=express();
app.use(cors());
app.use('/',router);
const PORT=8000;

DbConnection();

app.listen(PORT, ()=> console.log(`app is statrted on port ${PORT}`));