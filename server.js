const express = require("express");
const app = express();
const PORT = 4000;

const MySQL = require("mysql");
const Database = require("./database");
const DB = new Database();

const cors = require("cors");
app.use(cors());

const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 8;

const multer = require("multer");
const disk_storage = multer.diskStorage({
	destination: "client/src/uploads/",
	filename: function(req, file, cb) {
		let ext;
		if (file.mimetype == "image/png")
			ext = ".png";
		else if (file.mimetype == "image/jpeg")
			ext = ".jpeg"

		const u = Date.now() + Math.round(Math.random() * 1E9);
		cb(null, u + ext);
	}
});
const upload = multer({storage: disk_storage});

const BodyParser = require("body-parser");
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

app.get("/validate_email/:email", (req, res) => {
	const args = req.params;
	const params = [args.email];
	const query = `SELECT account_id FROM tbl_account WHERE email = ?`

	DB.query(query, params).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/register_teacher", (req, res) => {
	const args = req.body;
	const pw_hash = bcrypt.hashSync(args.password, SALT_ROUNDS);

	const q_account = `INSERT INTO tbl_account(email, pw_hash, type) VALUES(?, ?, ?)`;
	const q_teacher = `INSERT INTO tbl_teacher(fname, mname, lname, birthdate) VALUES(?, ?, ?, ?)`;

	DB.query(q_account, [args.email, pw_hash, type])
	.then(data => {
		if (data.success) {
			DB.query(q_teacher, [args.fname, args.mname, args.lname, args.birthdate])
			.then(data => {
				if (data.success)
					res.json(data);
				else res.json({success: false});
			});
		} else res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/sign_in", (req, res) => {
	const args = req.body;
	const query = `SELECT email, pw_hash, type FROM tbl_account WHERE email = ?`;

	DB.query(query, [args.email])
	.then(data => {
		if (data.success && data.results.length > 0) {
			const match = bcrypt.compareSync(args.password, data.results[0].pw_hash);
			res.json({
				email: data.results[0].email,
				success: match,
			});
		} else res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/get_profile", (req, res) => {
	const args = req.body;
	const query = `SELECT fname, mname, lname, birthdate
		FROM tbl_teacher
		INNER JOIN tbl_account
		ON tbl_account.account_id = tbl_teacher.account_id
		WHERE email = ?`;

	DB.query(query, [args.email])
	.then(data => {
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`)
});
