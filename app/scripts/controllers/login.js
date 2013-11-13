'use strict';

angular.module('confAppApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $http) {
    
    $scope.user = {};
    $scope.status = false;

    $rootScope.$watch("status", function(){

        $scope.status = $rootScope.status;

    });

    $scope.login = function(){

        $http.post("api/user/login", $scope.user)
            .success(function(){
                console.log("login success");
                $rootScope.authenticate($scope.user);
                $scope.status = true;
            })
            .error(function(){
                console.log("Login fail.");
                $scope.status = false;
            });

    };

    $scope.logout = function(){
        $scope.status = false;
        console.log("fire USER MODE event");
    };

  });
