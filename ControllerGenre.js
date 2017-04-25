var app = angular.module('myApp', []);
app.controller('genreController', function($scope, $http) {
    $http.get("http://green-web-bookstore.herokuapp.com/api/genres")
        .then(function(response) {
            $scope.myGenre = response.data;
        });
});