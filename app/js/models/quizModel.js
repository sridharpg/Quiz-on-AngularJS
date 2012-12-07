'use strict';

quizApp.factory('quizModel', function (questionModel) {
    return {
        initialize: function (data) {
            var quizData, questionId, maxScore;
            quizData = {};
            maxScore = 0;
            quizData.name = data.title;

            if (data.time !== null) {
                quizData.duration = data.durationPerQuestion;
            }

            quizData.isRandom = (data.randomized === true);
            quizData.questionnaire = [];

            questionId = 1;

            angular.forEach(data.questions, function (q) {
                quizData.questionnaire.push(questionModel.create(q, questionId));
                questionId = questionId + 1;
                maxScore = maxScore + q.weight;
            });
            quizData.currentPage = 0;

            return quizData;
        }
    };
});
