'use strict';

var DaysCtrl = angular.module('confAppApp').controller('DaysCtrl', function ($scope, $location, $routeParams, ConfSessions) {

    $scope.showSessions = function(day){

        $location.path('/days/' + day);

    };

});
