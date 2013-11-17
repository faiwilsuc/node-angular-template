'use strict';

describe('Controller: DaysCtrl', function () {

  // load the controller's module
  beforeEach(module('confAppApp'));

  var DaysCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DaysCtrl = $controller('DaysCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
