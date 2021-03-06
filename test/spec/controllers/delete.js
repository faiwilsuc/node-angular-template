'use strict';

describe('Controller: DeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('confAppApp'));

  var DeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeleteCtrl = $controller('DeleteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
