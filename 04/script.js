angular.module('NgBookApp', [])
  .directive('myDirective', function() {
    return {
      restrict: 'EAC',
      replace: true,
      template: '<a href="http://google.com">Click me to go to Google </a>'
    }
  })
  .controller('MyController',
    ['$scope',
      function($scope) {

      }]);
