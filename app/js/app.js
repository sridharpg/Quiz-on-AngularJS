'use strict';

var quizApp = angular.module('quizApp', ['ngResource', 'components']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'js/views/templates/homeView.html'}).
        when('/quiz', { templateUrl: 'js/views/templates/quizView.html'}).
        when('/result', { templateUrl: 'js/views/templates/resultView.html'});
}]);

quizApp.filter('startFrom', function () {
    return function (input, start) {
        var result = [];
        start = +start;
        if (input) {
            result = input.slice(start);
        }
        return result;
    };
});


