'use strict';

var quizApp = angular.module('quizApp', ['ngResource', 'components']);

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

//quizApp.config(function ($routeProvider) {
//    $routeProvider.when('/', { template: 'js/views/templates/quizView.html'});
//});
