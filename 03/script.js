angular.module('NgBookApp', [])
  .controller('MyController',
    ['$scope',
      function($scope) {

      }])
  .directive('oneToTen', function($filter) {
    return {
      require: '?ngModel',
      link: function(scope, ele, attrs, ngModel) {
        if (!ngModel) return;

        ngModel.$formatters.unshift(function(v) {
          return $filter('number')(v);
        });
      }
    };
  })
  // validations
  .directive('ensureUnique', ['$http', function($http) {
    return {
      require: 'ngModel',
      link: function(scope, ele, attrs, c) {
        scope.$watch(attrs.ngModel, function() {
          $http({
            method: 'POST',
            url: '/api/check/' + attrs.ensureUnique,
            data: { 'field': attrs.ensureUnique }
          }).success(function(data, status, headers, cfg) {
            c.$setValidity('unique', data.isUnique);
          }).error(function(data, status, headers, cfg) {
            c.$setValidity('unique', false);
          });
        });
      }
    };
  }])
  .directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$focused = false;
        element.bind('focus', function(evt) {
          element.addClass(FOCUS_CLASS);
          scope.$apply(function() {
            ctrl.$focused = true;
          });
        }).bind('blur', function(evt) {
          element.removeClass(FOCUS_CLASS);
          scope.$apply(function() {
            ctrl.$focused = false;
          });
        });
      }
    }
  }])
  .controller('signupController', ['$scope', function($scope) {
    $scope.submitted = false;
    $scope.signupForm = function() {
      if ($scope.signup_form.$valid) {
        // Submit as normal
      } else {
        $scope.signup_form.submitted = true;
      }
    }
  }]);

angular.module('NgBookAppNpMessages', ['ngMessages'])
  .controller('signupController', ['$scope', function($scope) {
    $scope.submitted = false;
    $scope.signupForm = function() {
      if ($scope.signup_form.$valid) {
        // Submit as normal
      } else {
        $scope.signup_form.submitted = true;
      }
    }
  }]);