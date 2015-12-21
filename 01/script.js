angular.module('emailParser', [])
  .config(['$interpolateProvider',
    function($interpolateProvider) {
      // here it will applied for all app
      $interpolateProvider.startSymbol('__');
      $interpolateProvider.endSymbol('__');
    }])
  .factory('EmailParser', ['$interpolate',
    function($interpolate) {
      // a service to handle parsing
      return {
        parse: function(text, context) {
          var template = $interpolate(text);
          return template(context);
        }
      }
    }]);

angular.module('NgBookApp', ['emailParser'])
  .controller('MyController',
      ['$scope', '$timeout', '$parse', '$interpolate', 'EmailParser',
      function($scope, $timeout, $parse, $interpolate, EmailParser) {
    $scope.clock = {};
    $scope.counter = 0;

    $scope.add = function(amount) {
      $scope.counter += amount;
    };
    $scope.subtract = function(amount) {
      $scope.counter -= amount;
    };
    $scope.$watch('expr', function(newVal, oldVal, scope) {
      if (newVal != oldVal) {
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

    $scope.$watch('emailBody', function(body) {
      if (body) {
        var template = $interpolate(body);
        $scope.previewText = template({ to: $scope.to });
      }
    });
    $scope.$watch('emailBody', function(body) {
      if (body) {
        var template = $interpolate(body);
        $scope.previewTextCustom = EmailParser.parse(body, { to: $scope.to });
      }
    });

  }]);