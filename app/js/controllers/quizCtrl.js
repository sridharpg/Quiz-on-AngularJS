"use strict";

quizApp.controller('QuizCtrl', function QuizCtrl($scope, $resource, quizModel) {
    /*More details on Resources: http://docs.angularjs.org/api/ngResource.$resource*/
    $resource('/app/fixtures/questions.json').get(function(data){
        $scope.quiz = quizModel.initialize(data);
    });
});
