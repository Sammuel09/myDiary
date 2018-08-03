import db from "./database.js";

const entries = `CREATE TABLE entries(userId integer REFERENCES users(id), 
	title TEXT not null, 
	body TEXT NOT NULL, 
	created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	completed_at TIMESTAMP DEFAULT NOW())`

export default entries;