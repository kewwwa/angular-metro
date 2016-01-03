(function() {
	angular.module('angular-metro-demo', ['angular-metro', 'ngRoute'])
		.config(appConfig)
		.run(runConfig)
		.controller('countdownController', countdownController);

	appConfig.$inject = ['$compileProvider', '$routeProvider'];
	runConfig.$inject = ['$rootScope', '$timeout']

	function appConfig($compileProvider, $routeProvider) {
		$compileProvider.debugInfoEnabled(false);

		$routeProvider
			.when('/countdown', {
				templateUrl: 'app/views/countdown.html',
				controller: 'countdownController as vm'
			})
			.otherwise({
				redirectTo: '/countdown'
			});
	}

	function runConfig($rootScope, $timeout) {
		$rootScope.$on("$viewContentLoaded", function(event, next, current) {
			$timeout(function() {
				prettyPrint();
			});
		});
	}

	function countdownController() {
		var vm = this;
		vm.refresh = refresh;
		vm.ended = ended;
		vm.seconds = 123;
		vm.isEnded = false;

		function refresh(days, hours, minutes, seconds) {
			vm.seconds = seconds;
		}

		function ended() {
			vm.isEnded = true;
		}
	}
})();
