import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config'
import Joi from 'joi';
import users from '../models/users';
import entries from '../models/entries';
import db from '../models/database';


function validateUser(user) {
	const schema = {
		username: Joi.string().alphanum().min(5).required(),
		email: Joi.string().email({minDomainAtoms: 2}).required(),
		password: Joi.string().required()
	}

	return Joi.validate(user, schema)
}

const create = (req, res) => {
	const { error } = validateUser(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
	console.log(hashedPassword);

	const user = {
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	};

	db.query('INSERT INTO users(username, email, password)' +
		'values(${username}, ${email}, ${password})', user)
		.then(data => {
		console.log(data);
		const token = jwt.sign({userId: data.id}, config.SECRET, {
			expiresIn: 86400
		});
		res.status(201)
			.json({
				auth: true,
				token: token,
				status:"success",
				message: "Inserted a new user"
			});
	})
	.catch(function(err){
		console.log(err);
	});
};

const login = (req, res) => {
	db.query("SELECT * from users WHERE email = $1", req.body.email)
		.then(data => {
			console.log(data)

			// const user = data.find(info => {
			// 	return info.email === req.body.email;
			// });

			// console.log(user);

			const passwordIsValid = bcrypt.compareSync(req.body.password, data[0].password);
			console.log(passwordIsValid);

			if(!passwordIsValid) {return res.status(401).send({auth:false, token:null})};

			const token = jwt.sign({userId: data[0].id}, config.SECRET, {
				expiresIn: 86400
			});
			console.log(token)
			return res.status(200).send({auth:true, token:token});
		})
		.catch(function(err){
			return res.status(500).send(err);
		})
}

export default {
    create,
    login
}