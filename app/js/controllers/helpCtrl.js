"use strict";

quizApp.controller('HelpCtrl', function HelpCtrl($scope, $resource, quizModel, $location) {
    $resource('fixtures/questions.json').get(function (data) {
        var quiz = quizModel.initialize(data);
        $scope.quizSize = quiz.questionnaire.length;
        $scope.duration = quiz.duration;
    });
    $scope.back = function () {
        $location.path('/');
    };
});
