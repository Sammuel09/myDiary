import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';
import users from '../models/users';
import entries from '../models/entries';
import db from '../models/database';


const validateEntry = entry => {
	const schema = {
		title: Joi.string().min(7).required(),
		body: Joi.string().required()
	};

	return Joi.validate(entry, schema)
}


const viewAll = (req, res) => {
	db.query('select * from entries')
	.then(function(data){
		res.status(200)
			.json({
				status:"success",
				data: data,
				message: "Retrieved ALL Users"
			});
	})
	.catch(function(err){
		return next(err);
	});
};


const view = (req, res) => {
	const entryId = parseInt(req.param.id);
	db.query("select * from entries WHERE id = $1", entryId)
		.then(function (data) {
			res.status(200)
				.json({
					status: "success",
					data: data,
					message: "Retrieved ONE entry",
				});
		})
		.catch(function(err){
			return next(err)
		});
};

const create = (req, res) => {
	const { error } = validateEntry(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	const entry = {
		title: req.body.title,
		body: req.body.body,
	}

	db.none('insert into entries(title, body)' + 'values(${title}, ${body})', req.body)
	.then(function(){
		res.status(201)
			.json({
				status:"success",
				message: "Inserted a new entry"
			});
	})
	.catch(function(err){
		return next(err);
	});
};

const update = (req, res) => {

	// if (!entry) {
	// 	res.status(404).send("The Entry with the given ID was not found");
	// 	return;
	// }

	const { error } = validateEntry(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	db.none("update entries set title=$1, body=$2",
		[req.body.title, req.body.body, parseInt(req.params.id)])
	.then(function(){
		res.status(200)
		.json({
			status: "success",
			message: "Updated entry"
		});
	})
	.catch(function(err){
		return 
	})
}

const remove = (req, res) => {

	// const entry = entries.find( e => {
	// 		return e.id === parseInt(req.params.entryId)
	// 	}
	// );
	if (!entry) {
		res.status(404).send("The Entry with the given ID was not found");
		return;
	} 

	const entryId = parseInt(req.params.id);
	db.result("delete from entries where id = $1", entryId)
	.then(function(result){
		res.status(200)
		.json({
			status:"status",
			message: `Removed ${result.rowCount} entries`
		})
		.catch(function(err){
			return (err)
		});
	});
}

export default {
    viewAll,
    view,
    create,
    update,
    remove,
};