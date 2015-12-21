angular.module('NgBookApp', [])
  .controller('MyController', function($scope, $timeout, $parse) {
    $scope.clock = {};
    $scope.counter = 0;

    $scope.add = function(amount) {
      $scope.counter += amount;
    };
    $scope.subtract = function(amount) {
      $scope.counter -= amount;
    };
    $scope.$watch('expr', function(newVal, oldVal, scope) {
      if(newVal != oldVal) {
        var parseFun = $parse(newVal);
        $scope.parsedValue = parseFun(scope);
      }
    });

    var updateClock = function() {
      $scope.clock.now = new Date();
      $timeout(function() {
        updateClock();
      }, 1000);
    };
    updateClock();

  });