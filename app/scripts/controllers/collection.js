'use strict';

angular.module('confAppApp')
  .controller('CollectionCtrl', function ($scope, $rootScope, $http, $routeParams, $location, ConfSessions) {

    $rootScope.loggedIn = false;

    //get all sessions
    $scope.items = ConfSessions.query();

  	//$scope.items = [];

    $scope.targetUrl = '/' + $routeParams.collection + "/";
    


      $scope.viewItem = function(targetItem){


        $location.path('/' + $routeParams.collection + "/" + targetItem);

        return false;
        
      };

  });
