var Datastore = require("nedb");
var $q = require("q");

angular
	.module('Data', [])
	.service('Storage', [function(){
		
		this.db = new Datastore({filename: "./proja.db", autoload: true});
		
		// return all data entries that contains the substring 
		this.findContainString = function(query){
			var d = $q.defer();
			var regex = new RegExp(query, "i");
			this.db.find({patientName: regex},function(err, docs){
				d.resolve(docs);
			})
			
			return d.promise;
		}
	}])