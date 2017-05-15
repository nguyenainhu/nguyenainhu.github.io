var myApp = angular.module('myApp');

myApp.controller('bookCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    console.log('bookCtrl loaded...');

    var root = 'https://green-web-bookstore.herokuapp.com';
    $scope.getBooks = function() {
        console.log("ddd");

        $http.get(root + '/api/books').success(function(response) {
            $scope.books = response;
        });
    }
    $scope.getGenres = function() {
        $http.get(root + '/api/genres').success(function(response) {
            $scope.genres = response;
        });
    }

    $scope.getBook = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/' + id).success(function(response) {
            $scope.book = response;
        });
    }

    $scope.addBook = function() {
        console.log($scope.book);
        $http.post(root + '/api/books/', $scope.book).success(function(response) {
            window.location.href = '#/books';
        });
    }

    $scope.updateBook = function() {
        var id = $routeParams.id;
        $http.put(root + '/api/books/' + id, $scope.book).success(function(response) {
            window.location.href = '#/books/' + $routeParams.id;
        });
    }

    $scope.removeBook = function(id) {
        $http.delete(root + '/api/books/' + id).success(function(response) {
            window.location.href = '#/books';
        });
    }
    $scope.bookSearch = function() {

        $scope.text = $routeParams.text;
        $http.get(root + '/api/books/search/' + $scope.text).success(function(response) {
            $scope.books = response;
            console.log(response);
        });
    }
    $scope.getBookByGenre = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/genre/' + id).success(function(response) {
            $scope.books = response;
        });
    }
    $scope.getGenres();
    $scope.getBanner = function() {
        $http.get(root + '/api/banners').success(function(response) {
            $scope.books = response;
        })
    };
    $scope.users = {
        userName: 'Nguyen Ai Nhu',
        userEmail: 'ainhu8596@gmail.com',
        userSex: 'Nữ',
        userPhone: '0985352687',
        userHome: '90 Thành Thái, P12, Quận 10, TP.HCM',
        userAvatarUrl: 'https://avatars0.githubusercontent.com/u/26504396?v=3&s=460',
        like: [],
    };


}]);