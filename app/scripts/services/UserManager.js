'use strict';

angular.module('confAppApp')
  .factory('UserManager', function () {
    // Service logic
    // ...

    var user = {
      authenticated: false,
      username:'',
      flags:''
    };

    // Public API here
    return user;

  });
