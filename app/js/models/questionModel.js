"use strict";

quizApp.factory('questionModel', function () {
    return {
        create: function (data, id) {
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
            question.type = data.type;
            question.id = id;

            question.isFillIn = function(){
                return (question.type == 'fillin');
            }

            return question;
        }
    };
});
