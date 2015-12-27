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

var aControllerFactory =
  function aController($scope, greeter) {
    console.log("LOADED controller", greeter);
    // ... Controller
  };
aControllerFactory.$inject = ['$scope', 'greeter'];
// Greeter service
var greeterService = function() {
  console.log("greeter service");
};
// Our app controller
angular.module('myApp', [])
  .controller('MyController', aControllerFactory)
  .factory('greeter', greeterService);
// Grab the injector and create a new scope
var injector = angular.injector(['ng', 'myApp']),
  controller = injector.get('$controller'),
  rootScope = injector.get('$rootScope'),
  newScope = rootScope.$new();
// Invoke the controller
controller('MyController', { $scope: newScope });