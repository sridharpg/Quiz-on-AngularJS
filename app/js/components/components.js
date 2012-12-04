angular.module('components', [])
    .directive('timer', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/views/templates/timer.html',
            controller: function($scope, $attrs) {
                console.log($attrs.duration)
            },
            scope: {
                duration: '@'
            }
        }
    });
