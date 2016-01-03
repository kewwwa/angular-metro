(function() {
	angular.module("angular-metro")
		.directive("metroCountdown", metroCountdownDirective);

	// Directive's bindable attributes.
	var metroCountdownScope = {
		'days': '=',
		'hours': '=',
		'minutes': '=',
		'seconds': '=',
		'backgroundColor': '@',
		'digitColor': '@',
		'dividerColor': '@',
		'labelColor': '@',
		'labels': '=',
		'onTickCallback': '&onTick',
		'onStopCallback': '&onStop',
	};

	// Determines whether declarative style is useless.
	function metroCountdownIsNotDeclarative(element, attrs) {
		return angular.isDefined(attrs.labels || attrs.onTick || attrs.onStop);
	}

	// Returns directive's template.
	function metroCountdownTemplate(element, attrs) {
		if (metroCountdownIsNotDeclarative(element, attrs))
			return '<div class="countdown"></div>';
		else
			return '<div class="countdown" data-role="countdown" data-days="{{ vm.days }}" data-hours="{{ vm.hours }}" data-minutes="{{ vm.minutes }}" data-seconds="{{ vm.seconds }}" data-background-color="{{ vm.backgroundColor }}" data-digit-color="{{ vm.digitColor }}" data-divider-color="{{ vm.dividerColor }}" data-label-color="{{ vm.labelColor }}"></div>';
	}

	// Inits element with JavaScript style.
	function metroCountdownLink(scope, element, attrs) {
		if (metroCountdownIsNotDeclarative(element, attrs)) {
			var options = scope.vm;

			options.onTick = function(days, hours, minutes, seconds) {
				scope.vm.onTickCallback({
					'days': days,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
				});
				scope.$apply();
			};

			options.onStop = function() {
				scope.vm.onStopCallback();
				scope.$apply();
			};

			element.children(0).countdown(options);
		}
	}

	// Returns directive's definition object.
	function metroCountdownDirective() {
		return {
			restrict: 'AE',
			transclude: false,
			bindToController: true,
			controllerAs: 'vm',
			template: metroCountdownTemplate,
			scope: metroCountdownScope,
			link: metroCountdownLink,
			controller: function() {}
		};
	}
})();
