'use strict';

var ItemCtrl = angular.module('confAppApp').controller('ItemCtrl', function ($scope, $http, $routeParams, ssContentManager, datasets) {

  	$scope.content = datasets.data[0];
  	$scope.content.collection = 'items';
  	//Get the requested item, from the requested collection from the web service
/**
  	$http({method:"get", url:"/api/item/" + $routeParams.collection + "/" + $routeParams.item}).
  		
  		success(function(data, status, headers, config){

			$scope.content = data[0];

			console.log('before contentManager');
			console.log($scope);

  		}).
  		error(function(data, status, headers, config){
  			
  			$scope.content = "";

  			console.log('Error communicating with server: ' + status);
  			console.log(headers);
  			console.log(data);

  		});

	*/

			
	var contentManager = ssContentManager({

		//items:[], //Optional array of ss-content items. If not provided the content manager watches them all
		//url: '', //Url of persistant storage service
		//driver: '', //The type of persistant storage. Default (and only option!!) JSON WebService
		scope: $scope //Pass the current scope

	});

	//Event handler to toggle edit mode
	$scope.authenticate = function(){

		//Toggle edit mode on content elements watched by contentManagaer
		contentManager.editMode('toggle');	

	};


	//Event handler for Edit Mode buttons
	$('.toggleEditModeButton').click(function(){

		//Check that the user is authenticated at this point??
		$scope.authenticate();

	});

  	$scope.$watch('content', function() {
	
		$http({method:"PUT", url:"/api/item", data: $scope.content});

  	}, true);

});


ItemCtrl.resolve = {
    datasets : function($q, $http, $route) {
        
        return $http({method:"get", url:"/api/item/" + $route.current.params.collection + "/" + $route.current.params.item});
        console.log('inside deferred');
        console.log($route);
        console.log($route.current.params.collection + "/" + $route.current.params.item);

        return $route.current.params.collection + "/" + $route.current.params.item;
    }
};
