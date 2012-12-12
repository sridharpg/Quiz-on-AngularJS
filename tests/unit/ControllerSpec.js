describe('App controllers', function () {

    beforeEach(module('quizApp'));

    describe('HomeCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function ($rootScope, $controller, $location) {
            scope = $rootScope.$new();
            scope.userName = "testUser";
            ctrl = $controller('HomeCtrl', {$scope: scope, $rootScope: $rootScope, $location: $location});
        }));

        it("should be valid name", function () {
            expect(scope.isValidUserName).toBeTruthy();
        });
    });
});

