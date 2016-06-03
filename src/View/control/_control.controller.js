var ipc = require("electron").ipcRenderer;

angular
.module("ControlView", ["Data", "angular-round-slider"])
.controller("ControlController", ["$scope", "Storage",  function ($scope, Storage) {
	$scope.treatmentContext = null;
	$scope.sliderModel = 55

	ipc.on("treatment-loaded", (treatment) => {
		$scope.treatmentContext = treatment;
		$scope.$apply();
		console.log($scope.treatmentContext);
	})
	
}]);