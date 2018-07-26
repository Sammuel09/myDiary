import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';
import entryRoute from './entryRoute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/v1", entryRoute);

app.get('/', (req, res) => {
	res.send('Hello myDairy App');
});


// ENVIRONMENT VARIABLE
const port = process.env.PORT||3000;
app.listen(port, () => {
	console.log(`Server started on PORT ${port}..`);
});

module.exports = app;