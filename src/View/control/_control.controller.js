var ipc = require("electron").ipcRenderer;

angular
.module("ControlView", ["Data", "angular.circular-slider"])
.controller("ControlController", ["$scope", "Storage",  function ($scope, Storage) {
	$scope.treatmentContext = 0;
	
	ipc.on("treatment-loaded", (treatment) => {
		$scope.treatmentContext = treatment;
		$scope.$apply();
	})
	
}]);