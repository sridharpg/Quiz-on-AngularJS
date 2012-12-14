"use strict";
//This controller enables the user to change the language, and navigate to other pages
quizApp.controller('AppCtrl', function ($scope, $location,$resource, $routeParams, appLocale) {

    $scope.selected = "en";

    $resource('fixtures/languages.json').get(function (data) {
        $scope.languages=data.options;
    });

    $scope.changeLanguage = function (culture) {
        appLocale.getResources(culture).then(function (localeResources) {
            $scope.locale = localeResources;
        });
    };
    //Ensure that when the app first loads that the locale resources are applied
    $scope.loadLang =  function () {
        if ($scope.locale == null || $scope.locale['locale-id'] !== $routeParams.culture) {
            $scope.changeLanguage($routeParams.culture);
        }
    };

    $scope.selectAction=function(){
        $scope.changeLanguage($scope.selected);
    };
});

