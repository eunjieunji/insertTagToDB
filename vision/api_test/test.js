var readdirp = require("readdirp");
var makeResult = require("./makeResult")();

var settings = {
	root: __dirname + "/images",
	entryType: "all"
};

var allFilePaths = [];

readdirp(settings, function(fileInfo) {
		var dirName = fileInfo.parentDir;
		if(dirName === "") { // 디렉토리인 경우 더이상 진행하지 않음
			return ;
		}
			
		var file = {};
		file.name = (fileInfo.name.split("."))[0];
		file.fullPath = fileInfo.fullPath;
		file.dirName = dirName;
			
		allFilePaths.push(file);
	}, 
	function (err, res) {
		if(err) {
			throw err;
		}
		for(var index = 0; index < allFilePaths.length; index++) {
			makeResult.searchVision(allFilePaths[index]);
		}
	}
);