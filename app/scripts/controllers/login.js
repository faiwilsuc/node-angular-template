'use strict';

angular.module('confAppApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $http) {
    
    $scope.user = {};
    $scope.status = false;

    $rootScope.$watch("status", function(){

        $scope.status = $rootScope.status;

    });

    $scope.login = function(){

        $http.post("api/user/login", {username:$scope.user.username, password:$scope.user.password})
            .success(function(){
                console.log("login success");
                $rootScope.authenticate($scope.user);
                $rootScope.authStatus = true;
                $rootScope.$broadcast('ssTrigger', 'show');
            })
            .error(function(){
                console.log("Login fail.");
                $rootScope.authStatus = false;
                $rootScope.$broadcast('ssTrigger', 'hide');
            });

    };

    $scope.logout = function(){
        $rootScope.authStatus = false;
        console.log("fire USER MODE event");
        $rootScope.$broadcast('ssTrigger', 'hide');
    };

  });
