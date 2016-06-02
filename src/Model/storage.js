var Datastore = require("nedb");
var $q = require("q");
var ipcRenderer = require('electron').ipcRenderer;


angular
	.module('Data', [])
	.service('Storage', [function(){
		
		this.db = new Datastore({filename: "./proja.db", autoload: true});
		this.treatments = [];
		
		this.patientContext = null;
		
		this.loadPatientContext = (p) => {
			this.patientContext = p;
		}
		
		// return all data entries that contains the substring 
		this.findContainString = function(query){
			var d = $q.defer();
			var regex = new RegExp(query, "i");
			this.db.find({patientName: regex},function(err, docs){
				d.resolve(docs);
			});
			
			return d.promise;
		};
		
		// load treatment data from index and patientContext
		this.loadTreatmentData = (index) => {
			var d = $q.defer();
			
			if(this.patientContext == null){
				d.reject();
			}else{
				// console.log(this.patientContext[0].treatments[index]);
				d.resolve(this.patientContext[0].treatments[index]);
			}
			
			return d.promise;
		}
		
		// retrieve the treatment history given the name of the patient 
		this.retrieveTreatmentHistory = function(name){
			
			var d = $q.defer();
			this.db.find({patientName: name}, function(err, docs){
				if(err){
					d.reject(err);
				}else{
					this.treatments = docs[0].treatments;
					d.resolve(this);
				}
			});
			
			return d.promise;	
		};
		
	}])
	.directive("retrieveTreatments", ["Storage", function(Storage){
		return function($scope, element, attrs){
			element.bind("click", function(evt){
				evt.preventDefault();
				
				var name = attrs.retrieveTreatments;
								
				Storage
					.retrieveTreatmentHistory(name)
					.then((storage) => {
						// i know this is ugly ..
						// i forget to design this part in the beginning 
						// patientContext is used to find the 
						Storage.findContainString(name).then((p) =>{
							Storage.loadPatientContext(p);
						})
						
						ipcRenderer.emit("treatment-recieved", storage.treatments);
					});
			})
		}
	}])
	.directive("treatmentLoaded", ["Storage",  (Storage) => {
		return ($scope, element, attrs) => {
			element.bind("click", (evt) => {
				evt.preventDefault();
				
				var index = attrs.treatmentLoaded;
				
				Storage.loadTreatmentData(index)
					.then((treatment) => {
						ipcRenderer.emit("treatment-loaded", treatment);
						// console.log(treatment);
					})
				
			})
		}
	}])