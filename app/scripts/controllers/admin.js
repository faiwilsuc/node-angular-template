'use strict';

angular.module('confAppApp')
  .controller('AdminCtrl', function ($scope, $http, $routeParams) {

  	$scope.content = {};

  	$scope.items = [];

	  		//load item
	$http({method:'get', url:'/api/items/'}).
		success(function(data, status, headers, config){
  				
		console.log(data);
		$scope.items = data;

	}).
	error(function(data, status, headers, config){

	});


  	if ($routeParams.id){
  		//load item
  		$http({method:'get', url:'/api/item/' + $routeParams.id}).
  			success(function(data, status, headers, config){
  				
  				console.log('loaded item');

  				console.log(data);
  				$scope.content = data[0];

  			}).
  			error(function(data, status, headers, config){

  			});

  	}

    console.log($routeParams);

    $scope.addContent = function(){

    	$http({method: 'post', url: '/api/item/', data:$scope.content}).
    		success(function(data, status, headers, config){

    			console.log('new data saved...');
    			console.log(data);

    		}).error(function(data, status, headers, config){

    			console.log('error');
    			console.log(data);
    			console.log(status);
    			console.log(headers);

    		});

    }

  });
