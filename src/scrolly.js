angular.module('app')
.directive('scrolly', function ($window, $timeout) {
	return {
		restrict: 'A',
		scope: {
			scrollyContainer: '=',
			scrolly: '=',
			scrollyDisabled: '=',
			scrollyDistance: '='
		},
		link: function (scope, element, attrs) {
			var offsett, distanceToBottom, difference, windowHeight = $window.innerHeight, container, pause = false, callbackDistance = 1;

        	/*
			*	handle the scrolling event 
			*/
			var handler = function(){
				offset = element[0].offsetTop;
				distanceToBottom = element[0].getBoundingClientRect().bottom;
				difference = distanceToBottom - windowHeight

				if(scope.scrollyDistance){
					callbackDistance = parseInt(scope.scrollyDistance) || 1;
				}
				
				if(difference < callbackDistance && !scope.scrollyDisabled && !pause) {
					pause = true;
				 	scope.scrolly();
				 	pause = false;
				}

			}
			/*
			*	gets the dom node of the container and binds a scroll handler
			*
			*/
			var handleContainerChange = function() {
				// Allow any reloads to finished rendering before firing
				$timeout(function(){
					if(scope.scrollyContainer instanceof HTMLElement){
			        	container = angular.element(scope.scrollyContainer);
				        container.on('scroll', handler);
					}
					else if (typeof scope.scrollyContainer == 'string' || scope.scrollyContainer instanceof String){
				        	container = angular.element(document.getElementById(scope.scrollyContainer));
				        	container.on('scroll', handler);
					}
				})
        	};
        	
        	/*
			*	sets a listener on the container in scope
			*/
        	var containerListener = scope.$watch('scrollyContainer', handleContainerChange);

        	scope.$on('$destroy', function() {
        		console.log("directive destroy")
          		container.off('scroll', handler);
          		container = undefined;
            	containerListener();
       		});
        	
		}
	};
})