"use strict";

quizApp.controller('QuizCtrl', function QuizCtrl($rootScope, $scope, $resource, $location, $element, quizModel, userModel) {
    var timerController;
    $resource('fixtures/questions.json').get(function (data) {
        $scope.quiz = quizModel.initialize(data);
        $scope.currentPosition = -1;

        $scope.user = userModel.initialize($rootScope.userName);

        if ($scope.quiz.isRandom) {
            $scope.quiz.questionnaire = $scope.shuffle($scope.quiz.questionnaire);
        }

        /*Todo: Should not access view from controller. Need to fix this part*/
        timerController = $element.find('.timer').scope();
        timerController.$on('timer_ended', function(){
            $scope.next();
        });

        $scope.updatePage();
    });

    $scope.hasNext = function () {
        return ($scope.currentPosition >= $scope.quiz.questionnaire.length - 1);
    };

    $scope.updatePage = function () {
        $scope.currentQuestion = $scope.quiz.questionnaire[++$scope.currentPosition];
    };

    $scope.submitAns = function (id) {
        var question = $scope.quiz.questionnaire.filter(function (value) {
            return value.id === id;
        });

        if ($scope.currentResponse === question.answer) {
            $scope.user.correct = $scope.user.correct + 1;
            $scope.user.score = $scope.user.score + question.weightage;
        }
        $scope.next();
    };

    $scope.shuffle = function (arg) {
        for (var j, x, i = arg.length; i; j = parseInt(Math.random() * i), x = arg[--i], arg[i] = arg[j], arg[j] = x);
        return arg;
    };

    $scope.isAnswered = function () {
        return ($scope.currentResponse !== "" && $scope.currentResponse !== undefined)
    };

    $scope.next=function(){
        var valid = $scope.hasNext();
        if (valid !== true) {
            $scope.currentResponse = "";
            $scope.updatePage();
            timerController.restart();
        } else {
            timerController.stop();
            $rootScope.quizSize = $scope.quiz.questionnaire.length;
            $rootScope.user = $scope.user;
            $location.path('/result');
        }
    };

    $scope.quit=function(){
        $rootScope.userName="";
        $location.path('/');
    };
});
