angular.module('NgBookApp', [])
  .directive('myDirective', function() {
    return {
      restrict: 'EAC',
      replace: true,
      template: '<a href="http://google.com">Click me to go to Google </a>'
    }
  })
  .run(function($rootScope) {
    // use .run to access $rootScope
    $rootScope.rootProperty = 'root scope';
  })
  .controller('ParentController', function($scope) {
    // use .controller to access properties inside `ng-controller`
    // in the DOMgo omit $scope, it is inferred based on the current controller
    $scope.parentProperty = 'parent scope';
  })
  .controller('ChildController', function($scope) {
    $scope.childProperty = 'child scope';
    // just like in the DOM, we can access any of the properties in the
    // prototype chain directly from the current $scope
    $scope.fullSentenceFromChild
      = 'Same $scope: We can access: ' +
      $scope.rootProperty + ' and ' +
      $scope.parentProperty + ' and ' +
      $scope.childProperty
  })
  .controller('MyController',
    ['$scope',
      function($scope) {

      }]);
