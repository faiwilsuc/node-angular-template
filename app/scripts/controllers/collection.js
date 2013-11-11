'use strict';

angular.module('confAppApp')
  .controller('CollectionCtrl', function ($scope, $http, $routeParams, $location, ConfSessions) {

    //get all sessions
    $scope.items = ConfSessions.query();

  	//$scope.items = [];

    $scope.targetUrl = '/' + $routeParams.collection + "/";
    


      $scope.viewItem = function(targetItem){


        $location.path('/' + $routeParams.collection + "/" + targetItem);

        return false;
        
      };

  });
