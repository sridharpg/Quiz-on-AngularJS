"use strict";

quizApp.controller('HelpCtrl', function HelpCtrl($scope, $location) {
    $scope.back = function(){
        $location.path('/');
    }
});
