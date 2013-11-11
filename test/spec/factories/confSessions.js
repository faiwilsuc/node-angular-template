'use strict';

describe('Service: confSessions', function () {

  // load the service's module
  beforeEach(module('confAppApp'));

  // instantiate service
  var confSessions;
  beforeEach(inject(function (_confSessions_) {
    confSessions = _confSessions_;
  }));

  it('should do something', function () {
    expect(!!confSessions).toBe(true);
  });

});
