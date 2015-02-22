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
        queryRole: { method: 'GET', isArray: true },
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

//MEDICACAO
services.factory('MedicacoesFactory', function ($resource) {
return $resource(serverAddress+'/medicacao', {}, {
   query: { method: 'GET', isArray: true },
   queryRole: { method: 'GET', isArray: true },
   create: { method: 'POST' }
});
});

services.factory('MedicacaoFactory', function ($resource) {
return $resource(serverAddress+'/medicacao/:id', {}, {
   show: { method: 'GET' },
   update: { method: 'PUT', params: {id: '@id'} },
   remove: { method: 'DELETE', params: {id: '@id'} }
});
});

//ATIVIDADE
services.factory('AtividadesFactory', function ($resource) {
return $resource(serverAddress+'/atividade', {}, {
   query: { method: 'GET', isArray: true },
   queryRole: { method: 'GET', isArray: true },
   create: { method: 'POST' }
});
});

services.factory('AtividadeFactory', function ($resource) {
return $resource(serverAddress+'/atividade/:id', {}, {
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
