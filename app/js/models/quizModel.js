'use strict';

quizApp.factory('quizModel', function (questionModel) {
    return {
        initialize: function (data) {
            var quizData = {};
            quizData.name = data.title;
            if (data.time !== null) {
                quizData.duration = data.time;
            }
            quizData.isRandom = (data.randomized === true);
            quizData.questionnaire = [];
            angular.forEach(data.questions, function (q) {
                quizData.questionnaire.push(questionModel.create(q));
            });
            return quizData;
        }
    };
});
