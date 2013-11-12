'use strict';

angular.module('confAppApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $http) {
    
    $scope.user = {};

    $scope.login = function(){

        $http.post("api/user/login", $scope.user)
            .success(function(){
                console.log("login success");
                $rootScope.authenticate($scope.user);
            })
            .error(function(){
                console.log("Login fail.");
            });

    };

  });
