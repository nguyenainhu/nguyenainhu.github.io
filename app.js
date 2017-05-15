var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'bookCtrl'
        })
        .when('/admin', {
            templateUrl: 'pages/admin.html',
            controller: 'bookCtrl'
        })
        .when('/books/detail/:id', {
            controller: 'bookCtrl',
            templateUrl: 'pages/detail.html'
        })
        .when('/books/search/:text', {
            controller: 'bookCtrl',
            templateUrl: 'pages/search.html'
        })
        .when('/books/genre/:id', {
            controller: 'bookCtrl',
            templateUrl: 'pages/genre.html'
        })
        .when('/admin/listbook', {
            controller: 'bookCtrl',
            templateUrl: 'pages/listbook.html'
        })
        .when('/admin/editbook/:id', {
            controller: 'bookCtrl',
            templateUrl: 'pages/editbook.html'
        })
        .when('/register', {
            controller: 'bookCtrl',
            templateUrl: 'pages/register.html'
        })
        .when('/customer/account/edit', {
            controller: 'bookCtrl',
            templateUrl: 'pages/acEdit.html'
        })
        .when('/sales/order', {
            controller: 'bookCtrl',
            templateUrl: 'pages/donhang.html'
        })
        .when('/customer/wishlist', {
            controller: 'bookCtrl',
            templateUrl: 'pages/wishlist.html'
        })
        .otherwise({
            templateUrl: 'pages/home.html'
        });
});