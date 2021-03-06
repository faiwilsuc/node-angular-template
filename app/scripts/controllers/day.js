'use strict';

var DayCtrl = angular.module('confAppApp').controller('DayCtrl', function ($scope, $location, $routeParams, ConfSessions, datasets) {

    console.log("datasets");
    console.log(datasets);
    $scope.items = datasets;
    $scope.targetUrl = "/sessions/";
});

  //resolve function to run before controller
DayCtrl.resolver = {
    datasets : function($q, $http, $route, $routeParams, ConfSessions) {
        
        var deferred = $q.defer();

        ConfSessions.post({day: $route.current.params.day, query: true}, function(result){
            deferred.resolve(result);
            
        });

        return deferred.promise;

    }
};
