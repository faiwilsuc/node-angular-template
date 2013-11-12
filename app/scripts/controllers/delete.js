'use strict';

angular.module('confAppApp')
    .controller('DeleteCtrl', function ($scope, $location, $http, $route, ConfSessions) {

        ConfSessions.remove({},{item_name: $route.current.params.item}, function(){
            
            console.log('delete complete!');

            $location.path('/');

        });

        /*
        $http({

            method: "delete",
            url: "/api/item/",
            data: {"collection": $route.current.params.collection, "item": $route.current.params.item}

        }).success(function (data, status, headers, config) {

            console.log("Winner winner chicken dinner");

        }).error(function (data, status, headers, config) {

            console.log("Scale the trail of the fail");

        });
    */
        //$location.path('/');

    });