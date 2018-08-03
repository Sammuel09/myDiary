import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';
import userRoute from './routes/userRoute';
import entryRoute from './routes/entryRoute';
import db from './models/database';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/v1", userRoute);
app.use("/api/v1", entryRoute);

app.get('/', (req, res) => {
	res.send('Hello myDairy App');
});

const port = process.env.PORT||3000;
app.listen(port, () => {
	console.log(`Server started on PORT ${port}..`);
});

module.exports = app;