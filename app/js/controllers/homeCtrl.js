quizApp.controller('HomeCtrl', function HomeCtrl($scope) {

    var MIN_NAME_LEN = 4;

    $scope.isValidUserName = function(){
        return ($scope.userName && $scope.userName.length > MIN_NAME_LEN);
    };
});
