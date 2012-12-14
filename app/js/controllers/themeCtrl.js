"use strict";

quizApp.controller('ThemeCtrl', function HomeCtrl($rootScope, $scope) {
    $scope.theme = 'dark';
    $scope.changeTheme = function(themeName) {
        $scope.theme = themeName;
    }
});
