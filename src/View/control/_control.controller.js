var ipc = require("electron").ipcRenderer;

angular
.module("ControlView", ["Data"])
.controller("ControlController", ["$scope", "Storage", function ($scope, Storage) {
	$scope.patientContext = null;
	$scope.treatmentContext = null;
		
}]);