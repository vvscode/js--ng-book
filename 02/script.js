angular.module('NgBookApp', [])
  .controller('MyController',
    ['$scope', '$filter',
      function($scope, $filter) {
        $scope.name = $filter('lowercase')('Ari');
        $scope.today = new Date();

        $scope.isCapitalized = function(str) {
          return str[0] == str[0].toUpperCase();
        };
      }]);