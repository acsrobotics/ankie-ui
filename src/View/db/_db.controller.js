angular
.module("DbView", ["Data"])
.controller("DbController", ["$scope", "Storage", function ($scope, Storage) {
	$scope.searchquery = "";
	$scope.patients = [];
	
	$scope.loadDataBasedOnQuery = function(){
		$scope.patients = [];
		if(!$scope.searchquery !== ""){
			Storage.findContainString($scope.searchquery).then(function(result){
				
				$scope.patients = result;
				$scope.$apply();
			})
		}
	}
	
}]);