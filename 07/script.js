angular.module('NgBookApp', [])
  .factory('greeter', function() {
    return {
      greet: function(msg) {
        alert(msg);
      }
    }
  })
  .controller('MyController',
    ['$scope', 'greeter',
      function($scope, greeter) {
        $scope.sayHello = function() {
          greeter.greet("Hello!");
        };
      }]);

// it works like:
 // Load the app with the injector
//  var injector = angular.injector(['ng', 'myApp']);
// Load the $controller service with the injector
//  var $controller = injector.get('$controller');
//  var scope = injector.get('$rootScope').$new();
// Load the controller, passing in a scope
// which is how angular does it at runtime
//  var MyController = $controller('MyController', {$scope: scope});
//  console.log(injector.annotate(function($q, greeter) {})); // ["$q", "greeter"]