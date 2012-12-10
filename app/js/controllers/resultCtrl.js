"use strict";

quizApp.controller('ResultCtrl', function HomeCtrl($rootScope, $scope) {
    $scope.user = $rootScope.user;
    $scope.quizSize = $rootScope.quizSize;
});