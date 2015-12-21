angular.module('NgBookApp', [])
  .controller('MyController', function($scope, $timeout) {
    $scope.clock = {};
    $scope.counter = 0;

    $scope.add = function(amount) {
      $scope.counter += amount;
    };
    $scope.subtract = function(amount) {
      $scope.counter -= amount;
    };

    var updateClock = function() {
      $scope.clock.now = new Date();
      $timeout(function() {
        updateClock();
      }, 1000);
    };
    updateClock();

  });