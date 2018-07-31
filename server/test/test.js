import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from "chai-http";

const expect = require("chai").expect;
chai.use(chaiHttp);

import app from "../index.js";

describe("/GET/api/v1/entries", () => {
	it("should return all entries", (done) => {
		chai.request(app)
		.get("/api/v1/entries")
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.a("array");
			expect(res.body[0]).to.be.an("object");
			expect(res.body[1]).to.be.an("object");
			expect(res.body[2]).to.be.an("object");
			expect(res.body.length).to.be.eql(3);
			done();
		})
	});
});

describe("/GET/api/v1/entries/:entryId", () => {
	it("should return a single entry", (done) => {
		chai.request(app)
		.get("/api/v1/entries/3")
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("createdAt");
			expect(res.body).to.have.property("title");
			expect(res.body).to.have.property("body");
			done();
		})
	});
});

describe("/POST/api/v1/entries", () => {
	it("should post an entry", (done) => {
		let entry = {
			"createdAt": "01/08/2018",
			"title": "On recovery",
			"body": "Hello there",
		}
		chai.request(app)
		.post("/api/v1/entries")
		.send(entry)
		.end((err,res) => {
			expect(res).to.have.status(201);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("createdAt");
			expect(res.body).to.have.property("title");
			expect(res.body).to.have.property("body");
			done();
		})
	})
});

describe("/PUT/api/v1/entries/:entryId", () => {
	it("should update a single entry", (done) => {
		let entry = {
			"createdAt": "01/08/2018",
			"title": "On recovery",
			"body": "Hello there",
		}
		chai.request(app)
		.put("/api/v1/entries/3")
		.send(entry)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("createdAt");
			expect(res.body).to.have.property("title");
			expect(res.body).to.have.property("body");
			done();
		})
	});
});

describe("/DELETE/api/v1/entries/:entryId", () => {
	it("should update a single entry", (done) => {
		chai.request(app)
		.delete("/api/v1/entries/3")
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("createdAt");
			expect(res.body).to.have.property("title");
			expect(res.body).to.have.property("body");
			done();
		})
	});
});