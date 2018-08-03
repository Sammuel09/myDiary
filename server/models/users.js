import db from "./database.js";

const users = `CREATE TABLE users(id SERIAL PRIMARY KEY, 
	username VARCHAR(15) not null, 
	email VARCHAR(30) not null, 
	password VARCHAR(100) not null
)`

export default users;

