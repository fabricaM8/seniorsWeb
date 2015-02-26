'use strict';

/* Controllers */
var app = angular.module('seniorsApp');

app.controller('MedicacaoListCtrl', function($scope, $rootScope, MedicacoesFactory, MedicacaoFactory, $location, $dialogs) {

	// callback for ng-click 'editMedicacao':
	$scope.editMedicacao = function(medicacaoId) {
		$location.path('/medicacao/detail/' + medicacaoId);
	};

	// callback for ng-click 'deleteMedicacao':
	$scope.deleteMedicacao = function(medicacaoId) {

		var dlg = $dialogs.confirm('Aviso', 'Deseja realmente excluir este Medicamento ?');
		dlg.result.then(
			//confirm	
			function(btn) {
				MedicacaoFactory.remove({id : medicacaoId	}).$promise.then(
					//successCallback
					function(data, status, headers, config) {
						$scope.medicacao = MedicacoesFactory.query();
					},
					//errorCallback
					function(data, status, headers, config) {
						$rootScope.error = "Erro ao remover Medicamento !";
					}
				);
			}, 
			//cancel	
			function(btn) {});
	};

	// callback for ng-click 'createMedicacao':
	$scope.createNewMedicacao = function() {
		$location.path('/medicacao/new');
	};

	$scope.meds = MedicacoesFactory.query();
});

app.controller('MedicacaoDetailCtrl', function($scope, $rootScope, $routeParams, MedicacaoFactory, MedicacoesFactory, $location) {

	// callback for ng-click 'updateMedicacao':
	$scope.updateMedicacao = function() {

		if($scope.update_medicacao.id != undefined){
				MedicacaoFactory.update($scope.update_medicacao).$promise.then(
						// success
						function(data, status, headers, config) {
							$location.path('/medicacao/list');
						},
						// error
						function(data, status, headers, config) {
							$rootScope.error = "Erro ao atualizar o Medicamento";
				});
		}else{
				 MedicacoesFactory.create($scope.update_medicacao).$promise.then(
						// success
						function(data, status, headers, config) {
							$location.path('/medicacao/list');
						},
						// error
						function(data, status, headers, config) {
							$rootScope.error = "Medicamento já existe";
				});
		}

	};

	// callback for ng-click 'cancel':
	$scope.cancel = function() {
		$location.path('/medicacao/list');
	};

	$scope.update_medicacao = MedicacaoFactory.show({
		id : $routeParams.id
	});
	
	//	document.getElementById("spanPrioridade1" + $scope.update_medicacao.prioridade).addClass('glyphicon-ok');;
	//DataPicker
	 $scope.today = function() {
		    $scope.dt = new Date();
		  };
		  $scope.today();

		  $scope.clear = function () {
		    $scope.dt = null;
		  };

		  // Disable weekend selection
		  $scope.disabled = function(date, mode) {
		    return"";
		   // ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		  };

		  $scope.toggleMin = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
		  };
		  $scope.toggleMin();
		  
		  $scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened = true;
		  };

		  $scope.dateOptions = {
		    formatYear: 'yyyy',
		    startingDay: 0,
		    showWeeks:'false'
		  };

		  $scope.formats = ['dd - MMMM - yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','fullDate'];
		  $scope.format = $scope.formats[4];
		//Fim DataPicker
		  
		  //timerpick
		  $scope.mytime = new Date();

		  $scope.hstep = 1;
		  $scope.mstep = 15;

		  $scope.options = {
		    hstep: [1, 2, 3],
		    mstep: [1, 5, 10, 15, 25, 30]
		  };

		  $scope.ismeridian = true;
		  $scope.toggleMode = function() {
		    $scope.ismeridian = ! $scope.ismeridian;
		  };

		  $scope.update = function() {
		    var d = new Date();
		    d.setHours( 1 );
		    d.setMinutes( 0 );
		    $scope.mytime = d;
		  };

		  $scope.changed = function () {
		   // $log.log('Time changed to: ' + $scope.mytime);
		  };

		  $scope.clear = function() {
		    $scope.mytime = null;
		  };
		  $scope.update();
		  //fim timerpicker
});

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

app.controller('UserDetailCtrl', function($scope, $rootScope, $routeParams, UserFactory, UsersFactory, $location) {

	// callback for ng-click 'updateUser':
	$scope.updateUser = function() {

		if ($scope.update_user.authorities !== 'undefined') {
			delete $scope.update_user.authorities;
		}
		if($scope.update_user.id != undefined){
				UserFactory.update($scope.update_user).$promise.then(
						// success
						function(data, status, headers, config) {
							$location.path('/user/list');
						},
						// error
						function(data, status, headers, config) {
							$rootScope.error = "Erro ao atualizar o usuário";
				});
		}else{
				 UsersFactory.create($scope.update_user).$promise.then(
						// success
						function(data, status, headers, config) {
							$location.path('/user/list');
						},
						// error
						function(data, status, headers, config) {
							$rootScope.error = "usuário já existe";
				});
		}

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
