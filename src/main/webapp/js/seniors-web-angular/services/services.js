'use strict';

/* Services */

/*
 http://docs.angularjs.org/api/ngResource.$resource

 Default ngResources are defined as

 'get':    {method:'GET'},
 'save':   {method:'POST'},
 'query':  {method:'GET', isArray:true},
 'remove': {method:'DELETE'},
 'delete': {method:'DELETE'}
 */
var serverAddress = 'api';
var services = angular.module('seniorsApp');

// USERS
services.factory('UsersFactory', function ($resource) {
    return $resource(serverAddress+'/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
});

services.factory('UserFactory', function ($resource) {
    return $resource(serverAddress+'/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        remove: { method: 'DELETE', params: {id: '@id'} }
    });
});

//Login service
services.factory('UserLoginService', function($resource) {
	return $resource(serverAddress+'/user/:action', {},	{
		authenticate: {
			method: 'POST',
			params: {'action' : 'authenticate'},
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		},
		logged: {
			method: 'POST',
			params: {'action' : 'logged'}
		},
		logout: {
			method: 'POST',
			params: {'action' : 'logout'}
		},
	});
});


// OFFERS
services.factory('OffersFactory', function ($resource) {
    return $resource(serverAddress+'/offers', {}, {
    	query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
});

services.factory('OfferFactory', function ($resource) {
    return $resource(serverAddress+'/offers/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        remove: { method: 'DELETE', params: {id: '@id'} }
    });
});

//Categories
services.factory('CategoriesFactory', function ($resource) {
    return $resource(serverAddress+'/categories', {}, {
    	query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
});

services.factory('CategoryFactory', function ($resource) {
    return $resource(serverAddress+'/categories/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        remove: { method: 'DELETE', params: {id: '@id'} }
    });
});