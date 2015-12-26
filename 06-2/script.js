angular.module('NgBookApp', ['ngRoute'])
angular.module('myApp', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        resolve: {
          user: function(SessionService) {
            return SessionService.getCurrentUser();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('MyController',
    ['$scope',
      function($scope) {

      }]);
