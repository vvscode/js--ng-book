angular.module('NgBookApp', [])
  .factory('greeter', function() {
    return {
      greet: function(msg) {
        alert(msg);
      }
    };
  })
  .factory('githubService', function($http) {
    var githubUrl = 'https://api.github.com';

    var runUserRequest = function(username, path) {
      // Return the promise from the $http service
      // that calls the Github API using JSONP
      return $http({
        method: 'JSONP',
        url: githubUrl + '/users/' +
        username + '/' +
        path + '?callback=JSON_CALLBACK'
      });
    };
    // Return the service object with a single function
    // events
    return {
      events: function(username) {
        return runUserRequest(username, 'events');
      }
    };
  })
  .controller('MyController',
    ['$scope', 'greeter',
      function($scope, greeter) {
        $scope.sayHello = function() {
          greeter.greet("Hello!");
        };
      }])
  .controller('ServiceController',
    function($scope, githubService) {
      // Watch for changes on the username property.
      // If there is a change, run the function
      $scope.$watch('username', function(newUsername) {
        // uses the $http service to call the
        // GitHub API and returns the resulting promise
        githubService.events(newUsername)
          .success(function(data, status, headers) {
            // the success function wraps
            // the response in data
            // so we need to call data.data to
            // fetch the raw data
            $scope.events = data.data;
          })
      });
    });

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

/*
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
*/