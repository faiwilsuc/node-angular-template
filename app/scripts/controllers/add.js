'use strict';

angular.module('confAppApp').controller('AddCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.newSession = {};

    $scope.saveSession = function(){

       var newSessionData = $scope.newSession;

        $http({method:'post', url:'/api/collection/', data: newSessionData}).
                success(function(data, status, headers, config){

                    
                    console.log(data);

                    //Add the collection of items to the $scope
                    $scope.items = data;

                }).
                error(function(data, status, headers, config){

                    $scope.items = "";

                    console.log('Error communicating with server: ' + status);
                    console.log(headers);
                    console.log(data);

                });

    };

});