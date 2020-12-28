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

const BodyParser = require("body-parser");
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

const multer = require("multer");
const disk_storage = multer.diskStorage({
	destination: "client/src/uploads/",
	filename: function(req, file, cb) {
		let ext;
		if (file.mimetype == "image/png")
			ext = ".png";
		else if (file.mimetype == "image/jpeg")
			ext = ".jpeg";

		const u = Date.now() + Math.round(Math.random() * 1E9);
		cb(null, u + ext);
	}
});
const upload = multer({storage: disk_storage});
const upload_file = multer({dest: "client/src/lessons/"});

app.post("/upload_image_teacher", upload.single("img_teacher"), function(req, res) {
	const file = req.file;
	const query = `INSERT INTO tbl_picture(name) VALUES(?)`;

	DB.query(query, [file.filename]).then(data => {
		data.path = file.path;
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/upload_lesson_file", upload.single("file_lesson"), function(req, res) {
	const file = req.file;
	const query = `INSERT INTO tbl_file(lesson_id, name, uploader) VALUES(?, ?, ?)`;

	DB.query(query, [file.filename]).then(data => {
		data.path = file.path;
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

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

app.get("/get_teachers_list/:is_admin", (req, res) => {
	const args = req.params;
	const query = `SELECT
		a.account_id, a.email,
		t.teacher_id, t.fname, t.mname, t.lname,
		DATE_FORMAT(t.birthdate, '%m/%d/%Y') AS birthdate,
		DATE_FORMAT(t.date_joined, '%m/%d/%Y') AS date_joined,
		t.picture_id
		FROM tbl_account AS a
		INNER JOIN tbl_teacher AS t ON a.account_id = t.account_id
		WHERE a.type = 'teacher'`

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_teacher_info/:teacher_id", (req, res) => {
	const args = req.params;
	const query = `SELECT
		a.account_id, a.email,
		t.teacher_id, t.fname, t.mname, t.lname,
		DATE_FORMAT(t.birthdate, '%m/%d/%Y') AS birthdate,
		DATE_FORMAT(t.date_joined, '%m/%d/%Y') AS date_joined,
		p.picture_id, p.name
		FROM tbl_account AS a
		INNER JOIN tbl_teacher AS t ON a.account_id = t.account_id
		LEFT JOIN tbl_picture AS p ON t.picture_id = p.picture_id
		WHERE t.teacher_id = ${args.teacher_id}`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/delete_account", (req, res) => {
	const args = req.body;
	const query = `DELETE FROM tbl_account WHERE account_id = ?`;

	DB.query(query, [args.account_id]).then(data => {
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/register_teacher", (req, res) => {
	const args = req.body;
	const pw_hash = bcrypt.hashSync(args.password, SALT_ROUNDS);

	const q_account = `INSERT INTO
		tbl_account(email, pw_hash, type)
		VALUES(?, ?, ?)`;
	const q_teacher = `INSERT INTO
		tbl_teacher(account_id, fname, mname, lname, birthdate, date_joined, picture_id)
		VALUES(?, ?, ?, ?, ?, NOW(), ?)`;

	const p_account = [args.email, pw_hash, args.type];

	DB.query(q_account, p_account)
	.then(data => {
		if (data.success) {
			const p_teacher = [data.results.insertId, args.fname, args.mname, args.lname, args.birthdate, args.picture_id];
			DB.query(q_teacher, p_teacher)
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
	const query = `SELECT * FROM tbl_account WHERE email = ?`;

	DB.query(query, [args.email])
	.then(data => {
		if (data.success) {
			const match = bcrypt.compareSync(args.password, data.results[0].pw_hash);

			res.json({
				email: data.results[0].email,
				results: data.results,
				success: match,
			});
		} else res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`)
});
