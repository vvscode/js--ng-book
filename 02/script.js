angular.module('NgBookApp.filters', [])
  .filter('capitalize', function() {
    return function(input) {
      // input will be the string we pass in
      if (input)
        return input[0].toUpperCase() +
          input.slice(1);
    }
  });

angular.module('NgBookApp', ['NgBookApp.filters'])
  .controller('MyController',
    ['$scope', '$filter',
      function($scope, $filter) {
        $scope.name = $filter('lowercase')('Ari');
        $scope.today = new Date();

        $scope.isCapitalized = function(str) {
          return str[0] == str[0].toUpperCase();
        };
      }]);
