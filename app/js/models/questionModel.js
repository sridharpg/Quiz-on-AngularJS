"use strict";

quizApp.factory('questionModel', function () {
    return {
        create: function (data) {
            var question = {};
            question.statement = data.question;
            if (data.answers !== null) {
                question.options = data.answers;
            }
            if (data.imageURL !== null) {
                question.imgPath = data.imageURL;
            }
            question.weightage = data.weight;
            question.isMCQ = (data.type === "radio");
            question.answer = data.correctAnswer;
            return question;
        }
    };
});