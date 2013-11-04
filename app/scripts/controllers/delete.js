'use strict';

angular.module('confAppApp')
  .controller('DeleteCtrl', function ($scope, $location) {

        console.log('delete: ');

          $location.path('/');

  });
