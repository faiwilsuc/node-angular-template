'use strict';

var ItemCtrl = angular.module('confAppApp').controller('ItemCtrl', function ($scope, $rootScope, $http, $routeParams, ctContentManager, ConfSessions, datasets) {

	//Get data returned from resolve function
  	$scope.content = datasets[0];

    console.log($scope.content);

    //Set the colledction name
    $scope.content.collection = 'items';
	
	//Create new contentManager		
	var contentManager = ctContentManager({

		//items:[], //Optional array of ss-content items. If not provided the content manager watches them all
		//url: '', //Url of persistant storage service
		//driver: '', //The type of persistant storage. Default (and only option!!) JSON WebService
		scope: $scope //Pass the current scope

	});

	//Event handler to toggle edit mode
	$rootScope.authenticate = function(e){

        //Replace this functionality with an event listener in the contentManager that listens for an event on the root scope
		//Toggle edit mode on content elements watched by contentManagaer
        console.log(e);
        if (e.username == "paupl" && e.password == "paupl123"){
		  contentManager.editMode('toggle');	
        }
	};


	//Event handler for Edit Mode buttons
	$('.toggleEditModeButton').click(function(){

		//Check that the user is authenticated at this point??
		$scope.authenticate();

	});

	//Enable two way data binding by updating posting data to webservice when item on scope changes
  	$scope.$watch('content', function() {
	
		//$http({method:"PUT", url:"/api/item", data: $scope.content});
        
        ConfSessions.update($scope.content)

  	}, true);

});


//resolve function to run before controller
ItemCtrl.resolve = {
    datasets : function($q, $http, $route, ConfSessions) {
        var deferred = $q.defer();

        ConfSessions.query({item_name:$route.current.params.item}, function(resultData){
            deferred.resolve(resultData);
        });

        return deferred.promise;

	}
};
