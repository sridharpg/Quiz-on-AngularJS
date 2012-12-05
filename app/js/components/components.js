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
                    secondsLeft = $attrs.duration,
                    duration = parseFloat(secondsLeft) * 1000,
                    startRightAngle = -180,
                    startLeftAngle = -180,
                    startHandAngle = 0,
                    perMSIncrementPerSide = 360 / duration,
                    perIterationIncrement = perMSIncrementPerSide * 10;

                $scope.duration = $attrs.duration;

                $scope.reset = function() {
                    $scope.stop();

                    $scope.currentRightAngle = startRightAngle;
                    $scope.currentLeftAngle = startLeftAngle;
                    $scope.currentHandAngle = startHandAngle;

                    secondsLeft = $attrs.duration;

                    timerInterval = -1;
                };

                $scope.restart = function() {
                    $scope.stop();
                    $scope.reset();
                    $scope.start();
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
                            } else {
                                $scope.currentHandAngle += perIterationIncrement;
                                if ($scope.currentHandAngle > 360) {
                                    $scope.currentHandAngle = 360;
                                }
                            }
                        });

                        secondsLeft -= 1/100;
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
                    if (timerInterval === null) {
                        status = 'ended';
                    } else if (timerInterval !== -1) {
                        status = 'started';
                    }
                    return status;
                };

                $scope.getReadableCurrentTime = function() {
                    var secs = secondsLeft < 0? 0: secondsLeft,
                        split = 60,
                        min = 0,
                        rsecs = 0,
                        rmins = 0;

                    if (secs > split) {
                        min = Math.floor(secs / split).toFixed(0);
                        rsecs = (secs % split).toFixed(0);
                    } else {
                        rsecs = (secs * 1).toFixed(0);
                    }

                    if (rsecs < 10) {
                        rsecs = "0" + rsecs;
                    }

                    if(min < 10) {
                        min = "0" + min;
                    }

                    rmins = min + ":" + rsecs;
                    return rmins;
                };

                $scope.reset();

                if ($attrs.autostart) {
                    setTimeout(function() {
                        $scope.start();
                    }, 1);
                }
            }
        }
    });
