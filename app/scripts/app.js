'use strict';

angular.module('confAppApp', [
  'contentTools',
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
      .when('/delete/:item', {
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
  }).run(function($rootScope, $http){

    console.log("check for session and log user in");

$rootScope.$on('$viewContentLoaded', function() {
    $http.post('/api/checkUserStatus',{})
      .success(function(){

        console.log("You are logged in");

        $rootScope.authStatus = true;

        

          //call it here
          $rootScope.$broadcast('ssTrigger', 'show');

             

      })
      .error(function(){
        console.log("You are not logged in");
        $rootScope.authStatus = false;

      });
      });   


    //Event handler to toggle edit mode
    $rootScope.authenticate = function(e){

      //Replace this functionality with an event listener in the contentManager that listens for an event on the root scope
      //Toggle edit mode on content elements watched by contentManagaer
      
      if (e.username == "paupl" && e.password == "paupl123"){

        //contentManager.editMode('toggle');  
        console.log("fire ADMIN MODE event");

      }
        
    };
  });


