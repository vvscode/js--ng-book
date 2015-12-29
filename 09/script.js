angular.module('NgBookApp', ['ngResource'])
  .controller('MyController',
    ['$scope',
      function($scope) {
        var User = $resource('/api/users/:userId.json', { userId: '@id' });

        // Using the $save() instance methods
        User.get({ id: '123' }, function(user) {
          user.name = 'Ari';
          user.$save(); // Save the user
        });
        // This is equivalent to the collection-level
        // resource call
        User.save({ id: '123' }, { name: 'Ari' });
      }]);
