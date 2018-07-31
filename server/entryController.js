import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';

const entries = [
	{id:1, createdAt:"25/06/1993", title:"Hello Diary", body:"Today is my birthday."},
	{id:2, createdAt:"26/06/1993", title:"What a Day!", body:"So yesterday was my birthday."},
	{id:3, createdAt: "30/06/1993", title:"Books I love", body:"Work has been so intense as of late."}
]

function validateEntry(entry) {
	const schema = {
		createdAt: Joi.string().required(),
		title: Joi.string().min(3).required(),
		body: Joi.string().required()
	};

	return Joi.validate(entry, schema)
}


const viewAll = (req, res) => {
	res.status(200).send(entries);
};


const view = (req, res) => {
	const entry = entries.find( e => {
			return e.id === parseInt(req.params.entryId)
		}
	);
	if (!entry) {
		res.status(404).send("The Entry with the given ID was not found");
		return;
	}
	res.status(200).send(entry);
};

const create = (req, res) => {
	const { error } = validateEntry(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	const entry = {
		id: entries.length + 1,
		createdAt: req.body.createdAt,
		title: req.body.title,
		body: req.body.body,
	}

	entries.push(entry);
	res.status(201).send(entry);
};

const update = (req, res) => {

	let entry = entries.find( e => {
			return e.id === parseInt(req.params.entryId)
		}
	);
	if (!entry) {
		res.status(404).send("The Entry with the given ID was not found");
		return;
	}

	const { error } = validateEntry(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	entry = req.body;
	res.status(200).send(entry);
}

const remove = (req, res) => {

	const entry = entries.find( e => {
			return e.id === parseInt(req.params.entryId)
		}
	);
	if (!entry) {
		res.status(404).send("The Entry with the given ID was not found");
		return;
	} 

	const index = entries.indexOf(entry);
	entries.splice(index, 1);

	res.status(200).send(entry);
}

module.exports = {
    viewAll,
    view,
    create,
    update,
    remove,
};