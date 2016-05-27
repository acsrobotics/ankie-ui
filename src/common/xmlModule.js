var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var fs     = require('fs');
var dbUtil = require('../db/DbUtil');
var $q     = require('q');
module.exports = {

	xmlToJs: function(fileName){
		var d = $q.defer();

		var file = __dirname + "../.." + fileName;
		fs.readFile(file, function(err, data){
			if(err){
				console.log(err);
				d.reject(err);
			}else{
				parser.parseString(data, function(err, result){
					var dataArray = [];
					if(err){
						console.log(err);
						d.reject(err);
					}else{
						var regex = /(\w+)\.\w+/g;
						dataArray = eval("result.dataroot." + regex.exec(fileName)[1]);
						dataArray = JSON.parse(JSON.stringify(dataArray));
						d.resolve(dataArray);
					}
				});
			}
		})

		return d.promise;
	}

}