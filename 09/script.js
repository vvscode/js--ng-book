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


// ---
//angular.module('myApp', [])
//  .factory('UserService',
//    ['Restangular',
//      function(Restangular) {
//        // Now we have access to the Restangular
//        // service in our UserService
//      }]);

angular.module('myApp', ['restangular'])
  .controller('MyController', [function($scope) {
    var User = Restangular.all('users');
    var allUsers = User.getList(); // GET /users
    var oneUser = Restangular.one('users', 'abc123');

    oneUser.get().then(function(user) {
      // GET /users/abc123/inboxes
      user.getList('inboxes');
    });

    // All URLs on searches will use
    // `http://google.com/` as the baseUrl
    var searches = Restangular.allUrl('one', 'http://google.com/');
    // Will send a request to GET http://google.com/
    searches.getList();

    var singleSearch = Restangular.oneUrl('betaSearch', 'http://beta.google.com/1');
    // Trigger a request to GET http://google.com/1
    singleSearch.get();

    var messages = Restangular.all('messages');
    // allMessages is a promise that will resolve
    // into the list of all messages
    var allMessages = messages.getList();

    // POST to /messages
    var newMessage = {
      body: "Hello world"
    };
    messages.post(newMessage);
    // OR we can call this on an element
    // to create a nested resource
    var message = Restangular.one('messages', 'abc123');
    message.post('replies', newMessage);

    // Calling then in the promise
    messages.post(newMessage).then(function(newMsg) {
      // Setting messages to an empty array first
      // and then fill it once getList is completed
      $scope.messages = messages.getList().$object;
    }, function error(reason) {
      // An error has occurred
    });

    var message = messages.get(123);
    message.remove(); // Send a DELETE to /messages

    var author = Restangular.one('authors', 'abc123');
    // Builds a GET to /authors/abc123/books
    var books = author.getList('books');

    Restangular.one('authors', 'abc123').then(function(author) {
      $scope.author = author;
    });
    // Later in the code
    // Builds a GET to /authors/abc123/authors
    // using $scope.author which is real object returned from the server
    $scope.author.getList('books');

    //Restangular supports, out of the box, all HTTP methods. It can support calling GET, PUT, POST,
    //  DELETE, HEAD, TRACE, OPTIONS, and PATCH.
    author.get(); // GET /authors/abc123
    author.getList('books'); // GET /authors/abc123/books
    author.put(); // PUT /authors/abc123
    author.post(); // POST /authors/abc123
    author.remove(); // DELETE /authors/abc123
    author.head(); // HEAD /authors/abc123
    author.trace(); // TRACE /authors/abc123
    author.options(); // OPTIONS /authors/abc123
    author.patch(); // PATCH /author/abc123

    // Maps to GET /users/abc123/biography
    author.customGET("biography");
    // Or customPOST with a new bio object
    // as {body: "Ari's bio"}
    // The two empty fields in between are the
    // params field and any custom headers
    author.customPOST({ body: "Ari's Bio" }, // post body
      "biography", // route
      {}, // custom params
      {}); // custom headers


    // We can send custom query parameters or custom headers with each of these methods.
    var queryParamObj = { role: 'admin' },
      headerObj = { 'x-user': 'admin' };
    messages.getList('accounts', queryParamObj, headerObj);
  }]);


