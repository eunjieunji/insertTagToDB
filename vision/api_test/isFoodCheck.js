var request = require("request");
var app = require("express")();
var makeFile = require("./makeFile")();
var crawling = require("./crawling")();

var client_id = "";
var client_secret = "";

module.exports = function () {
	return {
		foodCheck: function (searchData, fileInfo) {
			var api_url = "https://openapi.naver.com/v1/search/encyc.json?query=" + searchData.description;
			var options = {
				url: api_url,
				headers: {
					"X-Naver-Client-Id": client_id, 
					"X-Naver-Client-Secret": client_secret
				}
			};
			request.get(options, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					var items = JSON.parse(body).items;
					for(var index = 0; index < items.length; index++) {
						var searchResult = items[index];
						if(searchResult.link.indexOf("=48") !== -1) {
							makeFile.makeFile(searchData, __dirname + "/results/" + fileInfo.dirName, fileInfo.name + ".json");
							crawling.foodSearch(searchData.description);
							break;
						}
					}
				} else {
					console.log("error = " + response.statusCode);
				}
			});
		}
	};
};