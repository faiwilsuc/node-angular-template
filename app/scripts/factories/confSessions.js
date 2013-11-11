'use strict';

angular.module('confAppApp').factory('ConfSessions', function ConfSessions($resource) {

    return $resource('/api/collection/items/:item_name', {});

});
