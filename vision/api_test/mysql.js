var mysql = require("mysql");
var qs = require("querystring");

var con = mysql.createConnection({
	host: "",
	port: 3306,
	user: "",
	password: "",
	database: ""
});

module.exports = function () {
	var mysqlModule = {
		insertFood: function (fname, kcal, fat, tan, protein) {
			protein = protein.trim();
			var fatData = fat.substring(0, fat.indexOf("g"));
			var tanData = tan.substring(0, tan.indexOf("g"));
			var proteinData = protein.substring(0, protein.indexOf("g"));
			
			if(fatData === "") {
				fatData = fat;
			}
			if(tanData === "") {
				tanData = tan;
			}
			if(proteinData === "") {
				proteinData = protein;
			}
			
			var sql = "insert into tb_food ( " +
			  "eng_name, cal, fat, carb, protein" +
			  ") values ( " +
			  "?, ?, ?, ?, ? " +
			  ") ";
			con.query(
				sql, 
				[fname, parseInt(kcal), parseFloat(fatData), parseFloat(tanData), parseFloat(protein)],
				function (err, result) {
					if (err) {
						throw err;
					}
				}
			);
		},
		selectFood: function (fname, kcal, fat, tan, protein) {
			if(isNaN(kcal)) {
				kcal = 0;
			}
			var sql = "select * " + 
					  "  from tb_food " +
					  " where eng_name = ? ";
			con.query(sql, [fname], function (err, rows, fields) {
				if(err) {
					throw err;
				}
				if((rows.length) === 0) {
					mysqlModule.insertFood(fname, kcal, fat, tan, protein);
				}
				/*
				else {
					mysqlModule.updateFood(fname, kcal, fat, tan, protein);
				}
				 */
			});
		},
		updateFood: function (fname, translatedText) {
			var sql = "update tb_food " +
					  "   set kor_name = ? " +
					  "where eng_name = ? ";
			con.query(
				sql, 
				[translatedText, fname],
				function (err, result) {
					if (err) {
						throw err;
					}
				}
			);
		}
	};
	return mysqlModule;
};