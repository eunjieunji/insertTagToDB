var client = require("cheerio-httpcli");
var request = require("request");
var urlType = require("url");
var makeFile = require("./makeFile")();
var mysql = require("./mysql")();

var authenticity_token = "";

module.exports = function () {
	return {
		foodSearch: function (foodName) {
			var url = "";
			var param = {};
			
			client.fetch(url, param, function(err, $, res) {
				if(err) {
					console.log(err); 
					return;
				}
				/*
				makeFile.makeFile(
					$("#new_food_list > ul > li:nth-child(1) > div > div.nutritional_info").html(),
					__dirname + "/crawling", 
					foodName + ".html"
				);
				 */
				var foodInfo = $("#new_food_list > ul > li:nth-child(1) > div > div.nutritional_info").text().split(",");
				var foodDetail = [];
				for(var i = 0; i < foodInfo.length; i++) {
					foodDetail.push(foodInfo[i].split(":  "));
				}
				mysql.selectFood(foodName, foodDetail[1][1], foodDetail[2][1], foodDetail[3][1], foodDetail[4][1]);
			});
		}
	};
};