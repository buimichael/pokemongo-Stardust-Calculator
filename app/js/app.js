
var myApp = angular.module('myApp',['myCtrl']);
//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

var myCtrl = angular.module('myCtrl', []);
myCtrl.controller('MyCtrl', ['$scope', function ($scope){
    var  dustToLevel = [
    {"dust":200, "candy":1, "pkmnLevel": [1, 1.5, 2, 2.5]},
    {"dust":400, "candy":1, "pkmnLevel": [3, 3.5, 4, 4.5]},
    {"dust":600, "candy":1, "pkmnLevel": [5, 5.5, 6, 6.5]},
    {"dust":800, "candy":1, "pkmnLevel": [7, 7.5, 8, 8.5]},
    {"dust":1000, "candy":1, "pkmnLevel": [9, 9.5, 10, 10.5]},
    {"dust":1300, "candy":2, "pkmnLevel": [11, 11.5, 12, 12.5]},
    {"dust":1600, "candy":2, "pkmnLevel": [13, 13.5, 14, 14.5]},
    {"dust":1900, "candy":2, "pkmnLevel": [15, 15.5, 16, 16.5]},
    {"dust":2200, "candy":2, "pkmnLevel": [17, 17.5, 18, 18.5]},
    {"dust":2500, "candy":2, "pkmnLevel": [19, 19.5, 20, 20.5]},
    {"dust":3000, "candy":3, "pkmnLevel": [21, 21.5, 22, 22.5]},
    {"dust":3500, "candy":3, "pkmnLevel": [23, 23.5, 24, 24.5]},
    {"dust":4000, "candy":3, "pkmnLevel": [25, 25.5, 26, 26.5]},
    {"dust":4500, "candy":3, "pkmnLevel": [27, 27.5, 28, 28.5]},
    {"dust":5000, "candy":3, "pkmnLevel": [29, 29.5, 30, 30.5]},
    {"dust":6000, "candy":4, "pkmnLevel": [31, 31.5, 32, 32.5]},
    {"dust":7000, "candy":4, "pkmnLevel": [33, 33.5, 34, 34.5]},
    {"dust":8000, "candy":4, "pkmnLevel": [35, 35.5, 36, 36.5]},
    {"dust":9000, "candy":4, "pkmnLevel": [37, 37.5, 38, 38.5]},
    {"dust":10000, "candy":4, "pkmnLevel": [39, 39.5, 40, 40.5]}
  ];
  
  $scope.availableTrnLvls = [];
  for(var i=1; i<41; i++){
  	var newObj = {'id':i}
  	$scope.availableTrnLvls.push(newObj);
  }
  
  $scope.availablePkmnLvls = [];
  for(var i=1; i<41; i=i+0.5){
  	var newObj = {'id':i}
  	$scope.availablePkmnLvls.push(newObj);
  }

  $scope.trnLvl = 1;
  $scope.dustReq = 200;
  $scope.maxPkmnLvl = 0;
  $scope.minDustReq = 0;
  $scope.maxDustReq = 0;
  $scope.minCandyReq = 0;
  $scope.maxCandyReq = 0;
  $scope.exactPkmnLvl = null;

  $scope.calculate = function() {
  	$scope.reset();
    $scope.maxPkmnLvl = parseInt($scope.trnLvl) + 1.5;
    if(!$scope.exactPkmnLvl){
      $scope.pkmnLvlMin = Math.min.apply(Math, _.find(dustToLevel, {"dust":parseInt($scope.dustReq)}).pkmnLevel);
      $scope.pkmnLvlMax = Math.max.apply(Math, _.find(dustToLevel, {"dust":parseInt($scope.dustReq)}).pkmnLevel);
      $scope.maxDustReq= calcDust($scope.pkmnLvlMin, $scope.maxPkmnLvl);
      $scope.maxCandyReq = calcCandy($scope.pkmnLvlMin, $scope.maxPkmnLvl);
     
     $scope.minDustReq= calcDust($scope.pkmnLvlMax, $scope.maxPkmnLvl);
      $scope.minCandyReq = calcCandy($scope.pkmnLvlMax, $scope.maxPkmnLvl);
    } else {
    	$scope.maxDustReq= calcDust(parseInt($scope.exactPkmnLvl), $scope.maxPkmnLvl);
      $scope.maxCandyReq = calcCandy(parseInt($scope.exactPkmnLvl), $scope.maxPkmnLvl);

      $scope.minDustReq= calcDust(parseInt($scope.exactPkmnLvl), $scope.maxPkmnLvl);
      $scope.minCandyReq = calcCandy(parseInt($scope.exactPkmnLvl), $scope.maxPkmnLvl);
    }
		
  };
  
  var calcDust = function(pkmnLvl, maxPkmnLvl) {
  	var dustRes = 0;
 	 	for(var i=pkmnLvl; i<maxPkmnLvl; i=i+0.5){
			for(var key in dustToLevel) {
        if (dustToLevel.hasOwnProperty(key)) {
        	if(dustToLevel[key].pkmnLevel.includes(i)){
          	dustRes += dustToLevel[key].dust;
          }
        }
      }
    }
    return dustRes;
  }
  
  var calcCandy = function(pkmnLvl, maxPkmnLvl) {
  	var candyRes = 0;
 	 	for(var i=pkmnLvl; i<maxPkmnLvl; i=i+0.5){
			for(var key in dustToLevel) {
        if (dustToLevel.hasOwnProperty(key)) {
        	if(dustToLevel[key].pkmnLevel.includes(i)){
          	candyRes += dustToLevel[key].candy;
          }
        }
      }
    }
    return candyRes;
  }
  
  $scope.reset= function() {
    $scope.maxPkmnLvl = 0;
    $scope.minDustReq = 0;
    $scope.maxDustReq = 0;
    $scope.minCandyReq = 0;
    $scope.maxCandyReq = 0;
  }
  
  $scope.hardReset = function() { 
    $scope.exactPkmnLvl = null;
    $scope.trnLvl = 1;
		$scope.dustReq = 200;
    $scope.reset();
  }

}]);
