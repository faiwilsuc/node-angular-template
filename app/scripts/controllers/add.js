'use strict';

angular.module('confAppApp').controller('AddCtrl', function ($scope, $http, $routeParams, $location, ConfSessions) {

    $scope.newSession = {};

    $scope.saveSession = function(){

        ConfSessions.save(newSessionData, function(data){

                    
                    console.log(data);

                    //Add the collection of items to the $scope
                    $scope.items = data;
                    
        });


       var newSessionData = $scope.newSession;



    };

});