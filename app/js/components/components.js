angular.module('components', [])
    .directive('timer', function() {
        return {
            restrict: 'E',

            templateUrl: 'js/views/templates/timer.html',

            scope: true,

            replace: true,

            transclude: true,

            controller: function($attrs, $scope) {
                var timerInterval = null,
                    duration = parseFloat($attrs.duration) * 1000,
                    startRightAngle = -180,
                    startLeftAngle = -180,
                    startHandAngle = 0,
                    perMSIncrementPerSide = 360*2 / duration,
                    perIterationIncrement = perMSIncrementPerSide*10;

                $scope.duration = $attrs.duration;

                $scope.reset = function() {
                    $scope.stop();

                    $scope.currentRightAngle = startRightAngle;
                    $scope.currentLeftAngle = startLeftAngle;
                    $scope.currentHandAngle = startHandAngle;

                    timerInterval = -1;
                };

                $scope.start = function() {
                    timerInterval = setInterval(function() {
                        /*
                         Notes:
                         Scopes does not get updated automatically when changed from inside setTimeout/setInterval blocks.
                         Hence should wrap it up inside $scope.apply block!
                         */
                        $scope.$apply(function() {
                            var angle, shouldStop = false;
                            if ($scope.currentRightAngle < 0) {
                                angle = $scope.currentRightAngle;
                                angle += perIterationIncrement;
                                if (angle > 0) {
                                    angle = 0;
                                }
                                $scope.currentRightAngle = angle;
                            } else {
                                angle = $scope.currentLeftAngle;
                                angle += perIterationIncrement;
                                if (angle > 0) {
                                    angle = 0;
                                    shouldStop = true;
                                }
                                $scope.currentLeftAngle = angle;
                            }

                            if (shouldStop) {
                                $scope.stop();
                            }else{
                                $scope.currentHandAngle += perIterationIncrement;
                                if($scope.currentHandAngle > 360){
                                    $scope.currentHandAngle = 360;
                                }
                            }
                        });
                    }, 10);
                };

                $scope.stop = function() {
                    if (timerInterval) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                    }
                };

                $scope.getTimerStatus = function() {
                    var status = 'stopped';
                    if(timerInterval === null) {
                        status = 'ended';
                    }else if(timerInterval !== -1){
                        status = 'started';
                    }
                    return status;
                }

                $scope.reset();

                if ($attrs.autostart) {
                    setTimeout(function(){
                        $scope.start();
                    }, 1);
                }
            }
        }
    });
