var ipc = require("electron").ipcRenderer;

angular
.module("DbView", ["Data"])
.controller("DbController", ["$scope", "Storage", function ($scope, Storage) {
	$scope.searchquery = "";
	$scope.patients = [];
	$scope.treatments = [];
	
	$scope.loadDataBasedOnQuery = function(){
		$scope.patients = [];
		$scope.treatments = [];
		if(!$scope.searchquery !== ""){
			Storage.findContainString($scope.searchquery).then(function(result){
				$scope.patients = result;
				$scope.$apply();
			})
		}
	}
	
	// update view model when storage finish loading 
	ipc.on("treatment-recieved", (treatments) => {
		$scope.patients = [];
		
		// formating of the date string 
		for(var i in treatments){
			var str = new Date(treatments[i].date).toISOString().replace(/T/, " ").replace(/\..+/,"");
			treatments[i].date = str;
		}
		$scope.treatments = treatments;
		$scope.$apply();
	})
	
	
}]);