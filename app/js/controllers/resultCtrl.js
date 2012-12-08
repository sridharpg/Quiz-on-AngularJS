/**
 * Created with IntelliJ IDEA.
 * User: shiti
 * Date: 12/8/12
 * Time: 7:55 AM
 * To change this template use File | Settings | File Templates.
 */
"use strict";

quizApp.controller('ResultCtrl', function HomeCtrl($rootScope, $scope) {
    $scope.user = $rootScope.user;
    $scope.quizSize = $rootScope.quizSize;
});