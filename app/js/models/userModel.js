'use strict';

quizApp.factory('userModel', function () {
    return {
        initialize: function (name) {
            var user = {};
            user.name = name;
            user.response = "";
            user.correct = 0;
            user.score = 0;
            return user;
        }
    };
});