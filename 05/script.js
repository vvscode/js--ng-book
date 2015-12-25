angular.module('NgBookApp', [])
  .directive('myDirective',
    function($timeout, UserDefinedService) {
      // directive definition goes here

      // A directive definition object
      return {
        //restrict: String,
        //priority: Number,
        //terminal: Boolean,
        //template: String or Template Function:
        //  function(tElement, tAttrs) {...},
        //templateUrl: String,
        //replace: Boolean or String,
        //scope: Boolean or Object,
        //transclude: Boolean,
        //controller: String or
        //  function(scope, element, attrs, transclude, otherInjectables) { ... },
        //controllerAs: String,
        //require: String,
        //link: function(scope, iElement, iAttrs) { ... },
        //compile: // return an Object OR the link function
        // as in below:
        //  function(tElement, tAttrs, transclude) {
        //    return {
        //      pre: function(scope, iElement, iAttrs, controller) { ... },
        //      post: function(scope, iElement, iAttrs, controller) { ... }
        //    }
        //  // or
        //  return function postLink(...) { ... }
        //}
      };
    })
  .controller('MyController',
    ['$scope',
      function($scope) {

      }]);
