var ipc = require("electron").ipcRenderer;

angular
.module("DbView", ["Data"])
.controller("DbController", ["$scope", "Storage", "$location", function ($scope, Storage, $location) {
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
	
	$scope.renavigate = () => {
		$location.path("control");
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