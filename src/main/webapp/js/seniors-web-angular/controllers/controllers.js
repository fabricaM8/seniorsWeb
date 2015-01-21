'use strict';

/* Controllers */
var app = angular.module('seniorsApp');


app.controller('UserListCtrl', function($scope, $rootScope, UsersFactory, UserFactory, $location, $dialogs) {

	// callback for ng-click 'editUser':
	$scope.editUser = function(userId) {
		$location.path('/user/detail/' + userId);
	};

	// callback for ng-click 'deleteUser':
	$scope.deleteUser = function(userId) {

		var dlg = $dialogs.confirm('Aviso', 'Deseja realmente excluir este Usuário ?');
		dlg.result.then(
			//confirm	
			function(btn) {
				UserFactory.remove({id : userId	}).$promise.then(
					//successCallback
					function(data, status, headers, config) {
						$scope.users = UsersFactory.query();
					},
					//errorCallback
					function(data, status, headers, config) {
						$rootScope.error = "Erro ao remover usuário !";
					}
				);
			}, 
			//cancel	
			function(btn) {});
	};

	// callback for ng-click 'createUser':
	$scope.createNewUser = function() {
		$location.path('/user/new');
	};

	$scope.users = UsersFactory.query();
});

app.controller('UserDetailCtrl', function($scope, $rootScope, $routeParams, UserFactory, $location) {

	// callback for ng-click 'updateUser':
	$scope.updateUser = function() {

		if ($scope.update_user.authorities !== 'undefined') {
			delete $scope.update_user.authorities;
		}

		UserFactory.update($scope.update_user).$promise.then(
		// success
		function(data, status, headers, config) {
			$location.path('/user/list');
		},
		// error
		function(data, status, headers, config) {
			$rootScope.error = "Erro ao atualizar o usuário";
		});

	};

	// callback for ng-click 'cancel':
	$scope.cancel = function() {
		$location.path('/user/list');
	};

	$scope.update_user = UserFactory.show({
		id : $routeParams.id
	});
});

app.controller('UserCreationCtrl', function($scope, $rootScope, UsersFactory, $location) {

	// callback for ng-click 'createNewUser':
	$scope.createNewUser = function() {

		UsersFactory.create($scope.new_user).$promise.then(
		// success
		function(data, status, headers, config) {
			$location.path('/user/list');
		},
		// error
		function(data, status, headers, config) {
			$rootScope.error = "usuário já existe";
		});
	};
});

app.controller('CategoriesCreationCtrl', function($scope, $rootScope, CategoriesFactory, $location) {

	// callback for ng-click 'createNewCategory':
	$scope.createNewCategory = function() {

		CategoriesFactory.create($scope.category).$promise.then(
		// success
		function(data, status, headers, config) {
			$location.path('/categories/list');
		},
		// error
		function(data, status, headers, config) {
			$rootScope.error = "Categoria já existe";
		});
	};
});

app.controller('CategoriesListCtrl', function($scope, $rootScope, CategoriesFactory, $location, $dialogs) {

	// callback for ng-click 'editUser':
	$scope.editCategory = function(categoryId) {
		$location.path('/categories/detail/' + categoryId);
	};

	// callback for ng-click 'deleteUser':
	$scope.deleteCategory = function(categoryId) {

		var dlg = $dialogs.confirm('Aviso', 'Deseja realmente excluir esta Categoria ?');
		dlg.result.then(
			//confirm	
			function(btn) {
				CategoriesFactory.remove({id : categoryId	}).$promise.then(
					//successCallback
					function(data, status, headers, config) {
						$scope.categories = CategoriesFactory.query();
					},
					//errorCallback
					function(data, status, headers, config) {
						$rootScope.error = "Erro ao remover Categoria !";
					}
				);
			}, 
			//cancel	
			function(btn) {});
	};

	// callback for ng-click 'createUser':
	$scope.createNewCategory = function() {
		$location.path('/categories/new');
	};

	$scope.categories = CategoriesFactory.query();
});

app.controller('OfferCreationCtrl', function($scope, $rootScope, OffersFactory,	CategoriesFactory, $location, Constants, $dialogs) {
	
	var localFlow;
	
	$scope.$on('$viewContentLoaded', function() {
		localFlow = angular.element('#flowControl').scope().flow;
		
		localFlow.on('fileAdded', function(file, event){
		   file.name = file.name.replace(/ /g, "_");
		   if(file.size > 2048000) {
			   $dialogs.notify('Aviso', 'O Tamanho da imagem ' + file.name + ' é maior que o permitido ('+Constants.MAX_UPLOAD_SIZE+')!');
			   return false;
		   }
		   return true;
		});
    });

	CategoriesFactory.query().$promise.then(
		//successCallback
		function(data, status, headers, config) {
			$scope.categories = data;
		},
		//errorCallback
		function(data, status, headers, config) {}
	);

	$scope.noBannerSelected = function() {
		return angular.element('#flowControl').scope().flow.files.length == 0;
	};

	// callback for ng-click 'createNewOffer()':
	$scope.createNewOffer = function() {

		var files = angular.element('#flowControl').scope().flow.files;

		$scope.offer.imageURLs = [];

		for ( var i in files) {
			var imageUrl = {
				'url' : files[i].name
			};
			$scope.offer.imageURLs.push(imageUrl);
		};

		if ($scope.offer.imageURLs.length == 0) {
			$rootScope.error = "Insira ao menos 1 banner";
		}

		OffersFactory.create($scope.offer).$promise.then(
		// success
		function(data, status, headers, config) {
			$location.path('/offer/list');
		},
		// error
		function(responseData, status, headers, config) {
			var responseCode = responseData.data;
			if(responseCode!=='undefined' && Constants.OFFER_WITH_ZERO_POINTS === responseCode){
				$rootScope.error = "Insira uma pontuação maior que zero.";
			}else{
				$rootScope.error = "Erro ao criar uma oferta";
			}
		});
	};
});

app.controller('OfferListCtrl', function($scope, $rootScope, OffersFactory, OfferFactory, $location, $dialogs) {

	// callback for ng-click 'editOffer':
	$scope.editOffer = function(offerId) {
		$location.path('/offer/detail/' + offerId);
	};

	// callback for ng-click 'deleteOffer':
	$scope.deleteOffer = function(offerId) {

		var dlg = $dialogs.confirm('Aviso',	'Deseja realmente excluir esta Oferta?');
		dlg.result.then(
			function(btn) {
				OfferFactory.remove({id : offerId}).$promise.then(
					//successCallback
					function(data, status, headers, config) {
						$scope.offers = OffersFactory.query();
					},
					//errorCallback
					function(data, status, headers, config) {
						$rootScope.error = "Erro ao remover oferta";
					}
				);
			}, 
			function(btn) {
			}
		);
	};

	// callback for ng-click 'createOffer':
	$scope.createNewOffer = function() {
		$location.path('/offer/new');
	};

	$scope.offers = OffersFactory.query();
});

app.controller('OfferDetailCtrl', function($scope, $rootScope, $routeParams, OfferFactory, CategoriesFactory, $location,$dialogs) {

	var localFlow;
	
	$scope.$on('$viewContentLoaded', function() {
		localFlow = angular.element('#flowControl').scope().flow;
		
		localFlow.on('fileAdded', function(file, event){
		   file.name = file.name.replace(/ /g, "_");
		   if(file.size > 2048000) {
			   $dialogs.notify('ERRO NO UPLOAD', 'Tamanho da imagem ' + file.name + ' maior do que o permitido (2MB)!');
			   return false;
		   }
		   return true;
		});
    });
	
	CategoriesFactory.query().$promise.then(
	//successCallback
	function(data, status, headers, config) {
		$scope.categories = data;
	},
	//errorCallback
	function(data, status, headers, config) {
		$rootScope.error = "Erro ao obter os detalhes da Oferta!";
	});

	$scope.noBannerSelected = function() {
		return angular.element('#flowControl').scope().flow.files.length == 0 && $('.image-thumbnail').length == 0;
	};

	// callback for ng-click 'updateOffer':
	$scope.updateOffer = function() {

		$scope.offer.imageURLs = [];

		// OLD IMAGES
		for (var i = 0; i < $('.image-thumbnail').length; i++) {
			var src = $($('.image-thumbnail')[i]).attr('src').split('/');
			var imageUrl = {
				'url' : src[src.length - 1]
			};
			$scope.offer.imageURLs.push(imageUrl);
		}
		// OLD IMAGES END

		// UPLOADED IMAGES
		var files = angular.element('#flowControl').scope().flow.files;

		for ( var i in files) {
			var imageUrl = {
				'url' : files[i].name
			};
			$scope.offer.imageURLs.push(imageUrl);
		};
		// UPLOADED IMAGES - END

		if ($scope.offer.imageURLs.length == 0) {
			alert('Insira pelo menos 1 banner!');
			return;
		}

		OfferFactory.update($scope.offer).$promise.then(
		// success
		function(data, status, headers, config) {
			$location.path('/offer/list');
		},
		// error
		function(data, status, headers, config) {
			$rootScope.error = "Erro ao atualizar a oferta";
		});

	};

	$scope.removeBanner = function(bannerId) {
		
		var dlg = $dialogs.confirm('Aviso',	'Deseja realmente excluir esta Imagem?');
		dlg.result.then(
			//confirm
			function(btn) {
				angular.element('#banner' + bannerId).remove();
			}, 
			//cancel
			function(btn) {}
		);
	};

	// callback for ng-click 'cancel':
	$scope.cancel = function() {
		$location.path('/offer/list');
	};

	$scope.offer = OfferFactory.show({
		id : $routeParams.id
	});
});

app.controller('CategoryCtrl', function($scope, $rootScope, $routeParams,	CategoriesFactory, $location) {

	CategoriesFactory.query().$promise.then(
	//successCallback
	function(data, status, headers, config) {
		$scope.categories = data;
	},
	//errorCallback
	function(data, status, headers, config) {
		$rootScope.error = "Erro ao consultar as categorias";
	});
});

app.controller('LoginController', function($scope, $rootScope, $location, $cookieStore,	UserLoginService) {

		$scope.rememberMe = false;
		$scope.login = function() {
			UserLoginService.authenticate($.param({
				username : $scope.username,
				password : $scope.password
			})).$promise.then(
				//success	
				function(authenticationResult) {
					var authToken = authenticationResult.token;
					$rootScope.authToken = authToken;
					if ($scope.rememberMe) {
						$cookieStore.put('authToken',authToken);
					}

					UserLoginService.get(function(user) {
						$rootScope.user = user;
						$location.path("/");
					});
				},
				//errorCallback
				function(data, status, headers, config) {
					if (data.status !== 'undefined'
							&& data.status == 401) {
						$rootScope.error = "Erro na autentica&ccedil;&atilde;o. Favor verificar o login ou a senha!";
					}
				});
		};
});
