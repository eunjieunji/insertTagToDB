var request = require("request");
var app = require("express")();
//var isFoodCheck = require("./isFoodCheck")();
var mysql = require("./mysql")();
var crawling2 = require("./crawling2")();

var client_id = "";
var client_secret = "";

module.exports = function () {
	return {
		translateToKo: function (label, foodImage) {
			var api_url = "https://openapi.naver.com/v1/language/translate";
			var options = {
				url: api_url,
				form: {
					"source": "en", 
					"target": "ko", 
					"text": label.description,
					"encoding": "utf-8"
				},
				headers: {
					"X-Naver-Client-Id": client_id, 
					"X-Naver-Client-Secret": client_secret
				}
			};
			request.post(options, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					var translatedText = JSON.parse(body).message.result.translatedText;
//					label.description = translatedText;
//					isFoodCheck.foodCheck(label, foodImage);
					
					console.log("번역 결과 : " + label.description + " => " + translatedText);
					crawling2.foodSearch(translatedText);
//					mysql.updateFood(label.description, translatedText);
				} else {
					console.log("error = " + response.statusCode);
				}
			});
		}
	};
};