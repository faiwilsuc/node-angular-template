'use strict';

angular.module('confAppApp').controller('AddCtrl', function ($scope, $http, $routeParams, $location, ConfSessions) {

    $scope.newSession = {};
    $scope.newSession.collection = "sessions";
    
    $scope.saveSession = function(){

       var newSessionData = $scope.newSession;

        ConfSessions.post(newSessionData, function(data){

                    
                    console.log(data);

                    //Add the collection of items to the $scope
                    $scope.items = data;

                    
                    
        });

$location.path('/');


    };

});