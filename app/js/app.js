'use strict';

var quizApp = angular.module('quizApp', ['ngResource', 'components']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: '../app/templates/homeView.html'}).
        when('/quiz', { templateUrl: '../app/templates/quizView.html'}).
        when('/result', { templateUrl: '../app/templates/resultView.html'}).
        when('/help', { templateUrl: '../app/templates/helpView.html'});
}]);


