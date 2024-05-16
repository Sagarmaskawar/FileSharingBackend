import express from 'express';
import mongoose from 'mongoose';
import router from './router/routes.js';
import cors from 'cors';
import DbConnection from './Database/db.js';

const app = express();
app.use(cors());
app.use('/', router);

// Use the port provided by Heroku or default to 8000
const PORT = process.env.PORT || 8000;

DbConnection();

app.listen(PORT, () => console.log(`App is started on port ${PORT}`));
