describe('App controllers', function () {

    beforeEach(module('quizApp'));

    describe('HomeController', function () {
        var scope, ctrl;

        beforeEach(inject(function ($rootScope, $controller, $location) {
            scope = $rootScope.$new();
            ctrl = $controller('HomeCtrl', {$scope: scope});
        }));

        it('should be valid name', function () {
            scope.userName = "testUser";
            expect(scope.isValidUserName).toBeTruthy();
        });

        it('should ignore all spaces as name', function () {
            scope.userName = "      ";
            expect(scope.isValidUserName).toBeFalsy();
        });

    });

    describe('QuizController',function(){
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('fixtures/questions.json').
                respond({
                    "title": "Test Quiz",
                    "questions": [
                        {
                            "question": "Two ducks and two dogs have a total of fourteen legs.",
                            "answers": [
                                "true", "false"
                            ],
                            "weight": 2,
                            "type": "radio",
                            "correctAnswer":"false"
                        },
                        {
                            "question": "Which number should come next in the series? 53, 53, 40, 40, 27, 27",
                            "answers": [
                                12, 14, 27, 53
                            ],
                            "weight": 2,
                            "type": "radio",
                            "correctAnswer":"14"
                        }]
                });

            scope = $rootScope.$new();
            ctrl = $controller('QuizCtrl', {$scope:scope,$element:{}});
        }));

        it('should create "quiz" model with 2 questions',function(){
            expect(scope.quiz).toBeUndefined();
            $httpBackend.flush();
            expect(scope.quizSize).toBe(2);
        });

    });

});

