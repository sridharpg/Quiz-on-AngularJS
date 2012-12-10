'use strict';

quizApp.factory('quizModel', function (questionModel) {
    return {
        initialize: function (data) {
            var quizData, questionId;
            quizData = {};
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
            });
            quizData.currentPage = 0;

            return quizData;
        }
    };
});
