var myApp = angular.module('myApp', ['ngRoute', 'textAngular', 'ui.bootstrap', 'ngAnimate', 'ngCookies']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'bookCtrl'
        })
        .when('/addbook', {
            templateUrl: 'pages/addbook.html',
            controller: 'bookCtrl'
        })
        .when('/books/detail/:id', {
            controller: 'bookCtrl',
            templateUrl: 'pages/detail.html'
        })
        .when('/search/:keyword', {
            controller: 'bookCtrl',
            templateUrl: 'pages/search.html'
        })
        .when('/books/genre/:id', {
            controller: 'bookCtrl',
            templateUrl: 'pages/genre.html'
        })
        .when('/admin', {
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
        .when('/admin/addbook', {
            controller: 'bookCtrl',
            templateUrl: 'pages/addbook.html'
        })
        .when('/sales/bill', {
            controller: 'bookCtrl',
            templateUrl: 'pages/bill.html'
        })
        .when('/admin/orders', {
            controller: 'bookCtrl',
            templateUrl: 'pages/orders.html'
        })
        .when('/contacts', {
            controller: 'bookCtrl',
            templateUrl: 'pages/contacts.html'
        })
        .when('/allbook', {
            controller: 'bookCtrl',
            templateUrl: 'pages/allbook.html'
        })
        .otherwise({
            templateUrl: 'pages/home.html'
        });
});