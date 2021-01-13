const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const fs = require("fs");
const mime = require("mime");

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
		const u = Date.now() + Math.round(Math.random() * 1E9);
		cb(null, u + file.originalname);
	}
});
const upload = multer({storage: disk_storage});

const disk_storage_file = multer.diskStorage({
	destination: "client/src/lessons/",
	filename: function(req, file, cb) {
		const u = Date.now() + Math.round(Math.random() * 1E9);
		cb(null, u + file.originalname);
	}
});
const upload_file = multer({storage: disk_storage_file});

app.post("/upload_image_teacher", upload.single("img_teacher"), function(req, res) {
	const file = req.file;
	const query = `INSERT INTO tbl_picture(name) VALUES(?)`;

	DB.query(query, [file.filename]).then(data => {
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/update_image_teacher", upload.single("img_teacher"), function(req, res) {
	const file = req.file;
	const body = req.body;
	const query = `UPDATE tbl_picture SET
		name = ?
		WHERE picture_id = ${body.picture_id}`;

	DB.query(query, [file.filename]).then(data => {
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/upload_lesson_file", upload_file.array("file_lesson"), function(req, res) {
	const files = req.files;
	const body = req.body;
	const params = [];
	const query = `INSERT INTO tbl_file(lesson_id, name, uploader_id)
		VALUES ?`;

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		params.push([body.lesson_id, file.filename, body.account_id]);
	}

	DB.query(query, [params]).then(data => {
		res.json(data);
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
		t.teacher_id, t.fname, t.mname, t.lname, t.verified,
		CONCAT_WS(" ", t.fname, t.mname, t.lname) AS fullname,
		DATE_FORMAT(t.birthdate, '%m/%d/%Y') AS birthdate,
		DATE_FORMAT(t.date_joined, '%m/%d/%Y') AS date_joined,
		t.teacher_id, t.picture_id
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

app.get("/get_lesson_info/:lesson_id/:account_id/:is_admin", (req, res) => {
	const args = req.params;
	const query = `SELECT
		l.lesson_id, l.title, l.description,
		DATE_FORMAT(l.upload_date, '%m/%d/%Y') AS upload_date,
		f.file_id, f.name AS filename,
		f.uploader_id,
		a.account_id, a.email,
		t.teacher_id
		FROM tbl_lesson AS l
		INNER JOIN tbl_file AS f ON l.lesson_id = f.lesson_id
		INNER JOIN tbl_account AS a ON a.account_id = f.uploader_id
		INNER JOIN tbl_teacher AS t ON t.account_id = a.account_id
		WHERE l.lesson_id = ${args.lesson_id}`;

	DB.query(query).then(data => {
		if (args.is_admin != "false") {
			res.json(data);
		} else {
			if (data.results[0].uploader_id != args.account_id)
				res.json({success: false, err: "Can't access this"});
			else
				res.json(data);
		}
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_file/:filename", (req, res) => {
	const args = req.params;
	const filepath = path.join(__dirname, "client/src/lessons", args.filename);

	fs.readFile(filepath, function(err, data) {
		if (err) res.send("Error. File not found");
		else {
			res.contentType(mime.getType(args.filename));
			res.send(data);
		}
		res.end();
	});
});

app.post("/delete_file", (req, res) => {
	const args = req.body;
	const query = `DELETE FROM tbl_file WHERE file_id = ?`;

	DB.query(query, [args.file_id]).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/delete_lesson", (req, res) => {
	const args = req.body;
	const query = `DELETE FROM tbl_lesson WHERE lesson_id = ?`;

	DB.query(query, [args.lesson_id]).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_lessons_list/:is_admin", (req, res) => {
	const args = req.params;
	const query = `SELECT
		l.lesson_id, l.title, l.description,
		DATE_FORMAT(l.upload_date, '%m/%d/%Y') AS upload_date,
		f.file_id, f.name AS filename,
		a.account_id, a.email,
		t.teacher_id
		FROM tbl_lesson AS l
		INNER JOIN tbl_file AS f ON l.lesson_id = f.lesson_id
		INNER JOIN tbl_account AS a ON a.account_id = f.uploader_id
		INNER JOIN tbl_teacher AS t ON t.account_id = a.account_id`

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_teachers_lessons/:account_id", (req, res) => {
	const args = req.params;
	const query = `SELECT
		l.lesson_id, l.title, l.description,
		DATE_FORMAT(l.upload_date, '%m/%d/%Y') AS upload_date,
		f.file_id, f.name AS filename,
		a.account_id, a.email,
		t.teacher_id
		FROM tbl_lesson AS l
		INNER JOIN tbl_file AS f ON l.lesson_id = f.lesson_id
		INNER JOIN tbl_account AS a ON a.account_id = f.uploader_id
		INNER JOIN tbl_teacher AS t ON t.account_id = a.account_id
		WHERE a.account_id = ${args.account_id}`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_all_events", (req, res) => {
	const args = req.params;
	const query = `SELECT
		s.schedule_id, s.teacher_id,

		DATE_FORMAT(s.date, '%Y-%m-%d') AS date_key,
		DATE_FORMAT(s.date, '%m/%d/%Y') AS date,
		TIME_FORMAT(s.start_time, '%H:%i') AS start_time,
		TIME_FORMAT(s.end_time, '%H:%i') AS end_time,
		TIME_FORMAT(s.start_time, '%H') AS start_hr,
		TIME_FORMAT(s.start_time, '%i') AS start_min,
		TIME_FORMAT(s.end_time, '%H') AS end_hr,
		TIME_FORMAT(s.end_time, '%i') AS end_min,

		a.account_id, a.email,
		t.fname, t.mname, t.lname
	FROM tbl_schedule AS s
	INNER JOIN tbl_teacher AS t ON t.teacher_id = s.teacher_id
	INNER JOIN tbl_account AS a ON a.account_id = t.account_id`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_events/:account_id", (req, res) => {
	const args = req.params;
	const query = `SELECT
		s.schedule_id, s.teacher_id,
		DATE_FORMAT(s.date, '%Y-%m-%d') AS date_key,
		DATE_FORMAT(s.date, '%m/%d/%Y') AS date,
		TIME_FORMAT(s.start_time, '%H:%i') AS start_time,
		TIME_FORMAT(s.end_time, '%H:%i') AS end_time,
		TIME_FORMAT(s.start_time, '%H') AS start_hr,
		TIME_FORMAT(s.start_time, '%i') AS start_min,
		TIME_FORMAT(s.end_time, '%H') AS end_hr,
		TIME_FORMAT(s.end_time, '%i') AS end_min,
		a.account_id, a.email,
		t.fname, t.mname, t.lname
	FROM tbl_schedule AS s
	INNER JOIN tbl_teacher AS t ON t.teacher_id = s.teacher_id
	INNER JOIN tbl_account AS a ON a.account_id = t.account_id
	WHERE a.account_id = ${args.account_id}`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_sessions/:teacher_id", (req, res) => {
	const args = req.params;
	const query = `SELECT
			s.session_id, s.amount,
			DATE_FORMAT(s.session_date, '%Y-%m-%d') AS date_key,
			DATE_FORMAT(s.session_date, '%m/%d/%Y') AS date,
			TIME_FORMAT(s.session_start, '%H:%i') AS session_start,
			TIME_FORMAT(s.session_end, '%H:%i') AS session_end,
			TIME_FORMAT(s.session_start, '%H') AS start_hr,
			TIME_FORMAT(s.session_start, '%i') AS start_min,
			TIME_FORMAT(s.session_end, '%H') AS end_hr,
			TIME_FORMAT(s.session_end, '%i') AS end_min,
			st.student_id, st.fname, st.mname, st.lname, st.email AS student_email,
			CONCAT_WS(" ", st.fname, st.mname, st.lname) AS student_fullname,
			l.lesson_id, l.title AS lesson_title,
			t.teacher_id, a.email AS teacher_email
		FROM tbl_session AS s
		INNER JOIN tbl_teacher AS t ON s.teacher_id = t.teacher_id
		INNER JOIN tbl_account AS a ON t.account_id = a.account_id
		INNER JOIN tbl_student AS st ON s.student_id = st.student_id
		INNER JOIN tbl_lesson AS l ON s.lesson_id = l.lesson_id
		WHERE s.teacher_id = ${args.teacher_id}
		GROUP BY s.session_id`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_total_earnings/:teacher_id", (req, res) => {
	const args = req.params;
	const query = `SELECT
			SUM(amount) AS total
		FROM tbl_session
		WHERE teacher_id = ${args.teacher_id}
		AND session_date < NOW()
		AND session_end < NOW()`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_transactions/:teacher_id", (req, res) => {
	const args = req.params;
	const query = `SELECT
			s.session_id, s.amount,
			t.teacher_id,
			DATE_FORMAT(s.session_date, '%m/%d/%Y') AS date,
			TIME_FORMAT(s.session_start, '%H:%i') AS start_time,
			TIME_FORMAT(s.session_end, '%H:%i') AS end_time,
			a.email AS teacher_email,
			st.student_id, st.email AS student_email,
			l.lesson_id, l.title AS lesson_title
		FROM tbl_session AS s
		INNER JOIN tbl_teacher AS t ON s.teacher_id = t.teacher_id
		INNER JOIN tbl_account AS a ON t.account_id = a.account_id
		INNER JOIN tbl_student AS st ON s.student_id = st.student_id
		INNER JOIN tbl_lesson AS l ON s.lesson_id = l.lesson_id
		WHERE s.teacher_id = ${args.teacher_id}`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.get("/get_transactions_list", (req, res) => {
	const args = req.params;
	const query = `SELECT
			s.session_id, s.amount,
			t.teacher_id,
			DATE_FORMAT(s.session_date, '%m/%d/%Y') AS date,
			TIME_FORMAT(s.session_start, '%H:%i') AS start_time,
			TIME_FORMAT(s.session_end, '%H:%i') AS end_time,
			a.email AS teacher_email,
			st.student_id, st.email AS student_email,
			l.lesson_id, l.title AS lesson_title
		FROM tbl_session AS s
		INNER JOIN tbl_teacher AS t ON s.teacher_id = t.teacher_id
		INNER JOIN tbl_account AS a ON t.account_id = a.account_id
		INNER JOIN tbl_student AS st ON s.student_id = st.student_id
		INNER JOIN tbl_lesson AS l ON s.lesson_id = l.lesson_id`;

	DB.query(query).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/verify_account", (req, res) => {
	const args = req.body;
	const query = `UPDATE tbl_teacher SET verified = 1 WHERE teacher_id = ?`;

	DB.query(query, [args.teacher_id]).then(data => {
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
})

app.post("/unverify_account", (req, res) => {
	const args = req.body;
	const query = `UPDATE tbl_teacher SET verified = 0 WHERE teacher_id = ?`;

	DB.query(query, [args.teacher_id]).then(data => {
		if (data.success)
			res.json(data);
		else
			res.json({success: false});
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
})

app.post("/delete_teacher_account", (req, res) => {
	const args = req.body;
	const q_account = `DELETE FROM tbl_account WHERE account_id = ${args.account_id}`;
	const q_teacher = `DELETE FROM tbl_teacher WHERE teacher_id = ${args.teacher_id}`;

	DB.query(q_account).then(data => {
		if (data.success) {
			DB.query(q_teacher).then(data => {
				if (data.success)
					res.json(data);
				else
					res.json({success: false});
			}).catch(err => res.json({
				success: false,
				err: err,
			}));
		}
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
	const query = `SELECT
		a.account_id, a.email, a.pw_hash, a.type,
		t.teacher_id, t.verified
		FROM tbl_account AS a
		LEFT JOIN tbl_teacher AS t ON a.account_id = t.teacher_id
		WHERE email = ?`;

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


app.post("/update_teacher_info", (req, res) => {
	const args = req.body;
	const query = `UPDATE tbl_teacher SET
		fname = ?, mname = ?, lname = ?, birthdate = ?
		WHERE teacher_id = ${args.teacher_id}`;
	const params = [args.fname, args.mname, args.lname, args.birthdate];

	DB.query(query, params).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/add_lesson", (req, res) => {
	const args = req.body;
	const query = `INSERT INTO tbl_lesson(title, description, upload_date)
		VALUES(?, ?, NOW())`;
	const params = [args.title, args.desc];

	DB.query(query, params).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/add_schedule", (req, res) => {
	const args = req.body;
	const query = `INSERT INTO tbl_schedule(teacher_id, date, start_time, end_time)
		VALUES(?, ?, ?, ?)`;
	const params = [args.teacher_id, args.date, args.start_time, args.end_time];

	DB.query(query, params).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/delete_schedule", (req, res) => {
	const args = req.body;
	const query = `DELETE FROM tbl_schedule WHERE schedule_id = ?`;

	DB.query(query, [args.schedule_id]).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/register_student", (req, res) => {
	const args = req.body;
	const query = `INSERT INTO tbl_student(email, fname, mname, lname, birthdate, country)
		VALUES(?, ?, ?, ?, ?, ?)`;
	const params = [args.email, args.fname, args.mname, args.lname, args.birthdate, args.country];

	DB.query(query, params).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.post("/register_session", (req, res) => {
	const args = req.body;
	const query = `INSERT INTO tbl_session(student_id, teacher_id, lesson_id, amount, session_date, session_start, session_end)
		VALUES(?, ?, ?, ?, ?, ?, ?)`;
	const params = [args.student_id, args.teacher_id, args.lesson_id, args.amount, args.session_date, args.session_start, args.session_end];

	DB.query(query, params).then(data => {
		res.json(data);
	}).catch(err => res.json({
		success: false,
		err: err,
	}));
});

app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`)
});
