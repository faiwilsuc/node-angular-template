'use strict';

angular.module('confAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(function ($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);

    $routeProvider
      //Home
      .when('/', {
      //  templateUrl: 'views/main.html',
      //  controller: 'MainCtrl'
      redirectTo: '/items/'
      })
            //Create a new item
      .when('/add/session', {
        templateUrl: 'views/add.html',
        controller: "AddCtrl",
      })
      //Delete an item
      .when('/delete/:id', {
        templateUrl: 'views/delete.html',
        controller: "DeleteCtrl",
      })      
      //View all items in a collection
      .when('/:collection', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionCtrl'
      })
      //View an item
      .when('/:collection/:item', {
        templateUrl: 'views/item.html',
        controller: "ItemCtrl",
        resolve:  ItemCtrl.resolve
      })

      //Create a new collection

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })       
      .when('/admin/:id', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })                
      .otherwise({
        redirectTo: '#/items/'
      });
  });


