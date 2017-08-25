var vision = require("@google-cloud/vision")({
	projectId: "jhl-project",
	keyFilename: __dirname + "/JHLProject-9638fd0e1076.json"
});
//var papago = require("./papago")();
var isFoodCheck = require("./isFoodCheck")();

module.exports = function () {
	return {
		searchVision: function (foodImage) {
			vision.annotateImage({
				image: {
					source: {
						filename: foodImage.fullPath
					}
				},
				features: [{
					type: "WEB_DETECTION",
					maxResults: 10
				}]
			})
			.then(response => {
				var labels = response[0].webDetection.webEntities;
				
				labels.forEach((label) => {
					if(label.description !== "") {
//						papago.translateToKo(label, foodImage);
						isFoodCheck.foodCheck(label, foodImage);
					}
				});
			})
			.catch((err) => 
				console.error('ERROR:', err)
			);
		}
	};
};