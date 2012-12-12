'use strict';

var quizApp = angular.module('quizApp', ['ngResource', 'components']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'js/views/templates/homeView.html'}).
        when('/quiz', { templateUrl: 'js/views/templates/quizView.html'}).
        when('/result', { templateUrl: 'js/views/templates/resultView.html'});
}]);


