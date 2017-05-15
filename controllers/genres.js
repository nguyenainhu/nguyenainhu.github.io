myApp.controller('GenreController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    console.log('bookCtrl loaded...');
    var root = 'https://green-web-bookstore.herokuapp.com';
    $scope.getGenres = function() {
        $http.get(root + '/api/genres').success(function(response) {
            $scope.myGenres = response;
        });
    }
}]);