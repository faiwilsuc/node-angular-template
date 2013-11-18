'use strict';

angular.module('confAppApp')
  .controller('CollectionCtrl', function ($scope, $rootScope, $http, $routeParams, $location, ConfSessions) {

    //$rootScope.loggedIn = false;

    //get all sessions
    $scope.items = ConfSessions.query();

    $scope.deleteItem = function(itemName){

      $location.path('/delete/' + itemName);

    };

    $scope.createSession = function(){

      $location.path('/add/session');

    };

    $scope.targetUrl = '/sessions/';
    
    $scope.viewItem = function(targetItem){

      $location.path('/' + $routeParams.collection + "/" + targetItem);

      return false;
      
    };

  });
