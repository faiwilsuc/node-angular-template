'use strict';

angular.module('confAppApp')
  .controller('CollectionCtrl', function ($scope, $http, $routeParams, $location) {

  	$scope.items = [];

    $scope.targetUrl = '/' + $routeParams.collection + "/";
    
  	//Return a list of all items belonging to the named collection
  	$http({method:'get', url:'/api/collection/' + $routeParams.collection}).
  		success(function(data, status, headers, config){

        console.log(data);

  			//Add the collection of items to the $scope
  			$scope.items = data;

  		}).
  		error(function(data, status, headers, config){

  			$scope.items = "";

  			console.log('Error communicating with server: ' + status);
  			console.log(headers);
  			console.log(data);

  		});

      $scope.viewItem = function(targetItem){


        $location.path('/' + $routeParams.collection + "/" + targetItem);

        return false;
        
      };

  });
