'use strict';

var quizApp = angular.module('quizApp', ['ngResource', 'components']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'js/views/templates/homeView.html'}).
        when('/quiz', { templateUrl: 'js/views/templates/quizView.html'}).
        when('/result', { templateUrl: 'js/views/templates/resultView.html'}).
        when('/help', { templateUrl: 'js/views/templates/helpView.html'});
}]).service('appLocale', function ($q, $http, $timeout) {
            
            var getLocaleResources = function (culture) {
                var deferred = $q.defer();
                culture = culture || 'en';
                $timeout(function () {
                    $http.
                        get('js/i18n/angular-locale_' + culture + '.js').
                        success(function (response) {
                            eval(response);
                        }).
                        error(function (response) {
                            console.log('Unable to locate AngularJS locale resource.');
                        });
                    $http.
                        get('js/i18n/' + culture + '.js').
                        success(function (response) {
                            deferred.resolve(response);
                        }).
                        error(function (response) {
                            console.log('Unable to locate application locale resource.');
                        });
                });
                return deferred.promise;
            };
            return {
                getResources: getLocaleResources
            };
        }).
        //This controller enables the user to change the language, and navigate to other pages
        controller('AppCtrl', function ($scope, $location, $routeParams, appLocale) {

            $scope.changeLanguage = function (culture) {
                appLocale.getResources(culture).then(function (localeResources) {
                    $scope.locale = localeResources;
                });
            };
            //Ensure that when the app first loads that the locale resources are applied
            $scope.$on('$routeChangeSuccess', function () {
                if ($scope.locale == null || $scope.locale['locale-id'] !== $routeParams.culture) {
                    $scope.changeLanguage($routeParams.culture);
                }
            });
        });


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


