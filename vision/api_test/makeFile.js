var fs = require("fs");

module.exports = function () {
	return {
		makeFile: function (fileData, saveDir, fileName) {
			if(!fs.existsSync(saveDir)) {
				fs.mkdirSync(saveDir);
			}
			var writeData = fileData;
			if(fileName.indexOf(".json")) {
				writeData = JSON.stringify(fileData, null, "\t");
			}
			fs.appendFileSync(saveDir + "/" + fileName, writeData, {encoding: "utf-8"});
		}
	};
};