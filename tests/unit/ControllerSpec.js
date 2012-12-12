describe('App controllers', function () {

    beforeEach(module('quizApp'));

    describe('HomeCtrl', function () {
        var scope, ctrl;

        beforeEach(inject(function ($rootScope, $controller, $location) {
            scope = $rootScope.$new();
            ctrl = $controller('HomeCtrl', {$scope: scope, $rootScope: $rootScope, $location: $location});
        }));

        it("should be valid name", function () {
            scope.userName = "testUser";
            expect(scope.isValidUserName).toBeTruthy();
        });

        it("should ignore all spaces as name", function () {
            scope.userName = "      ";
            expect(scope.isValidUserName).toBeFalsy();
        });

    });


});

