'use strict';

angular.module('confAppApp').factory('ConfSessions', function ConfSessions($resource) {

    return $resource('/api/collection/sessions/:item_name', {item_name:"@item_name"},{
        query: {method:'GET', params:{'item_name':''}, isArray:true},
        post: {method:'POST', isArray: true},
        update: {method:'PUT'},
        remove: {method:'DELETE', params: {}}
    });

});
