var app = angular.module('myApp', []);
app.controller('bookController', function($scope, $http) {
    $http.get("https://green-web-bookstore.herokuapp.com/api/books")
        .then(function(response) {
            $scope.myBook = response.data;
        });
    $http.get("http://green-web-bookstore.herokuapp.com/api/genres")
        .then(function(response) {
            $scope.myGenre = response.data;
        });
});