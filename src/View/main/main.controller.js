angular
.module("View", ["winjs", "ngRoute", "DbView", "ControlView"])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: "../db/_db.html",
			controller:  "DbController"
		})
		.when('/db', {
			templateUrl: "../db/_db.html",
			controller:  "DbController"
		})
		.when('/control', {
			templateUrl: "../control/_control.html",
			controller:  "ControlController"
		});
}])
.controller("MainController", ["$scope", function ($scope) {
	$scope.splitViewElement = document.getElementById("splitView");
}]);