angular.module('NgBookApp', [])
  .controller('MyController',
    ['$scope',
      function($scope) {
        $scope.getData = function() {
          $http({
            method: 'GET',
            url: '/api/users.json'
          }).success(function(data, status, headers, config) {
            // This is called when the response is
            // ready
          }).error(function(data, status, headers, config) {
            // This is called when the response
            // comes back with an error status
          });
        };

        $scope.getData2 = function() {
          var promise = $http({
            method: 'GET',
            url: '/api/users.json'
          });
          promise.then(function(resp) {
            // resp is a response object
          }, function(resp) {
            // resp with error
          });
          // OR we can use the success/error methods
          promise.success(function(data, status, headers, config) {
            // Handle successful responses
          });
          // error handling
          promise.error(function(data, status, headers, config) {
            // Handle non-successful responses
          });
        }
      }]);
