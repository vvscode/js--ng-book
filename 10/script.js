angular.module('myApp.services', ['ngCookies'])
  .constant('ACCESS_LEVELS', {
    pub: 1,
    user: 2
  })
  .factory('Auth',
    function($cookieStore, ACCESS_LEVELS) {
      var _user = $cookieStore.get('user');

      var setUser = function(user) {
        if (!user.role || user.role < 0) {
          user.role = ACCESS_LEVELS.pub;
        }
        _user = user;
        $cookieStore.put('user', _user);
      };

      return {
        isAuthorized: function(lvl) {
          return _user.role >= lvl;
        },
        setUser: setUser,
        isLoggedIn: function() {
          return _user ? true : false;
        },
        getUser: function() {
          return _user;
        },
        getId: function() {
          return _user ? _user._id : null;
        },
        getToken: function() {
          return _user ? _user.token : '';
        },
        logout: function() {
          $cookieStore.remove('user');
          _user = null;
        }
      }
    });

angular.module('myApp', ['myApp.services'])
  .config(function($routeProvider, ACCESS_LEVELS) {
    $routeProvider
      .when('/', {
        controller: 'MainController',
        templateUrl: 'views/main.html',
        access_level: ACCESS_LEVELS.pub
      })
      .when('/account', {
        controller: 'AccountController',
        templateUrl: 'views/account.html',
        access_level: ACCESS_LEVELS.user
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .run(function($rootScope, $location, Auth) {
    // Set a watch on the $routeChangeStart
    $rootScope.$on('$routeChangeStart',
      function(evt, next, curr) {

        if (!Auth.isAuthorized(next.$$route.access_level)) {
          if (Auth.isLoggedIn()) {
            // The user is logged in, but does not
            // have permissions to view the view
            $location.path('/');
          } else {
            $location.path('/login');
          }
        }
      })
  })
  .controller('MyController', function($scope) {

  })
  // Below we set handling for responses status codes
  .config(function($httpProvider) {
    // Build our interceptor here
    var interceptor =
      function($q, $rootScope, Auth) {
        return {
          'response': function(resp) {
            if (resp.config.url == '/api/login') {
              // Assuming our API server response
              // with the following data:
              // { token: "AUTH_TOKEN" }
              Auth.setToken(resp.data.token);
            }
            return resp;
          },
          'responseError': function(rejection) {
            // Handle errors
            switch (rejection.status) {
              case 401:
                if (rejection.config.url !== 'api/login')
                // If we're not on the login page
                  $rootScope
                    .$broadcast('auth:loginRequired');
                break;

              case 403:
                $rootScope
                  .$broadcast('auth:forbidden');
                break;

              case 404:
                $rootScope
                  .$broadcast('page:notFound');
                break;

              case 500:
                $rootScope
                  .$broadcast('server:error');
                break;
            }

            return $q.reject(rejection);
          }
        }
      }
  })
  .service('Backend', function($http, $q, $rootScope, Auth) {
    this.getDashboardData = function() {
      $http({
        method: 'GET',
        url: 'http://myserver.com/api/dashboard',
        params: {
          token: Auth.getToken()
        }
      }).success(function(data) {
        return data.data;
      }).catch(function(reason) {
        $q.reject(reason);
      })
    }
  });