"use strict";

quizApp.controller('ResultCtrl', function HomeCtrl($rootScope, $scope, $location) {
    $scope.user = $rootScope.user;
    $scope.quizSize = $rootScope.quizSize;

    $scope.playAgain = function () {
        $rootScope.user = {};
        $rootScope.quizSize = 0;
        $location.path('/quiz');
    };

    $scope.newGame = function () {
        $rootScope.user = {};
        $rootScope.userName = "";
        $rootScope.quizSize = 0;
        $location.path('/');
    };
});