var ipc = require("electron").ipcRenderer;

angular
.module("ControlView", ["Data"])
.controller("ControlController", ["$scope", "Storage",  function ($scope, Storage) {
	$scope.treatmentContext = null;

	ipc.on("treatment-loaded", (treatment) => {
		$scope.treatmentContext = treatment;
		$scope.$apply();
		console.log($scope.treatmentContext);
	})
	
}]);