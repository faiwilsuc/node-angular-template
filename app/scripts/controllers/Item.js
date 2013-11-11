'use strict';

var ItemCtrl = angular.module('confAppApp').controller('ItemCtrl', function ($scope, $http, $routeParams, datasets, ctContentManager) {

	//Get data returned from resolve function
  	$scope.content = datasets.data[0];

  	//Collection being invoked by this controller
  	$scope.content.collection = 'items';
	
	//Create new contentManager		
	var contentManager = ctContentManager({

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

	//Enable two way data binding by updating posting data to webservice when item on scope changes
  	$scope.$watch('content', function() {
	
		$http({method:"PUT", url:"/api/item", data: $scope.content});

  	}, true);

});

//resolve function to run before controller
ItemCtrl.resolve = {
    datasets : function($q, $http, $route) {
        
		return $http({method:"get", url:"/api/item/" + $route.current.params.collection + "/" + $route.current.params.item})
			.success(function(data, status, headers, config){
				console.log("Winner winner chicken dinner");

			}).error(function(data, status, headers, config){
				console.log("Scale the trail of the fail");

			});

	//console.log($route.current.params.collection + "/" + $route.current.params.item);

	//return $route.current.params.collection + "/" + $route.current.params.item;
	}
};


