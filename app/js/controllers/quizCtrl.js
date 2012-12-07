"use strict";

quizApp.controller('QuizCtrl', function QuizCtrl($scope, $resource, quizModel, userModel) {
    $resource('fixtures/questions.json').get(function (data) {
        $scope.quiz = quizModel.initialize(data);
        $scope.currentPosition = -1;

        if ($scope.quiz.isRandom) {
            $scope.quiz.questionnaire = $scope.shuffle($scope.quiz.questionnaire);
        }

        $scope.updatePage();
    });

    $scope.hasNext = function () {
        return ($scope.currentPosition >= $scope.quiz.questionnaire.length - 1);
    };

    $scope.updatePage = function () {
        $scope.currentQuestion = $scope.quiz.questionnaire[++$scope.currentPosition];
    };

    $scope.user = {};

    $scope.submitAns = function (id) {
        var question = $scope.quiz.questionnaire.filter(function (value) {
            return value.id === id;
        });

        if ($scope.user.response === question.answer) {
            $scope.user.correct = $scope.user.correct + 1;
            $scope.user.score = $scope.user.score + question.weightage;
        }

        var valid=$scope.hasNext();
        if (valid!==true) {
            $scope.user.response="";
            $scope.updatePage();
        } else {
            //TODO result view
            console.log($scope.user.score);
        }
    };

    $scope.shuffle = function (arg) {
        for (var j, x, i = arg.length; i; j = parseInt(Math.random() * i), x = arg[--i], arg[i] = arg[j], arg[j] = x);
        return arg;
    };

    $scope.isAnswered = function () {
        return ($scope.user.response !== "" && $scope.user.response !== undefined)
    };

});
