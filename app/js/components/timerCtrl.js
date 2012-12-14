"use strict";

quizApp.controller('TimerCtrl', function TimerCtrl($rootScope, $scope) {
    var timerInterval = null,
        secondsLeft, duration, perMSIncrementPerSide,
        startRightAngle = -180,
        startLeftAngle = -180,
        startHandAngle = 0, perIterationIncrement;

    $scope.duration = 0;

    $scope.reset = function() {
        $scope.stop();

        $scope.currentRightAngle = startRightAngle;
        $scope.currentLeftAngle = startLeftAngle;
        $scope.currentHandAngle = startHandAngle;

        timerInterval = -1;

        secondsLeft = $scope.duration;
        duration = parseFloat(secondsLeft) * 1000;
        perMSIncrementPerSide = 360 / duration;
        perIterationIncrement = perMSIncrementPerSide * 10;
    };

    $scope.restart = function() {
        $scope.stop();
        $scope.reset();
        setTimeout(function(){
            $scope.$apply(function() {
                /*Starting after a timeout because the classes needs to be reset.*/
                $scope.start();
            });
        }, 1);
    };

    $scope.start = function() {
        $scope.reset();
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
                    if (angle > -1) {
                        angle = 0;
                        shouldStop = true;
                    }
                    $scope.currentLeftAngle = angle;
                }

                if (shouldStop) {
                    $scope.stop(true);
                    $scope.currentHandAngle = 360;
                } else {
                    $scope.currentHandAngle += perIterationIncrement;
                    if ($scope.currentHandAngle > 360) {
                        $scope.currentHandAngle = 360;
                    }
                }
            });

            secondsLeft -= 1/100;
        }, 10);
        $scope.$broadcast('timer_started');
    };

    $scope.stop = function(ended) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = ended? null: -1;
            if(ended){
                $scope.$broadcast('timer_ended');
            }else{
                $scope.$broadcast('timer_stopped');
            }
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
});
