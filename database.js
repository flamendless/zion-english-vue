const MySQL = require("mysql");
const Promise = require("bluebird");

class Database
{
	constructor()
	{
		this.db = MySQL.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "zion_english",
			socketPath: "/opt/lampp/var/mysql/mysql.sock",
		});

		this.db.connect(function(err) {
			if (err) return console.log("error: " + err.message);
			console.log("Connected to MySQL Server");
		});
	}

	query(sql, params = [])
	{
		return new Promise((resolve, reject) => {
			this.db.query(sql, params, (err, results, fields) => {
				console.log(err, results)
				if (err)
					reject(err);
				else
					resolve({results: results, success: true});
			});
		});
	}
}

module.exports = Database
