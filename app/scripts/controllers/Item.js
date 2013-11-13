'use strict';

var ItemCtrl = angular.module('confAppApp').controller('ItemCtrl', function ($scope, $rootScope, $http, $routeParams, ctContentManager, ConfSessions, datasets) {

	//Get data returned from resolve function
  	$scope.content = datasets[0];

    //Set the colledction name <-This could come from the url
    $scope.content.collection = 'items';
	
	//Create new contentManager		
	var contentManager = ctContentManager({
		//items:[], //Optional array of ct-content items. If not provided the content manager watches them all
		scope: $scope //Pass the current scope
	});

	//Enable two way data binding by updating posting data to webservice when item on scope changes
  	$scope.$watch('content', function() {
        
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
