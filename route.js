var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "index.html"
        })
        .when("/allbook", {
            templateUrl: "all-book.html"
        })
        .when("/admin", {
            templateUrl: "admin.html"
        })
        .when("/blue", {
            templateUrl: "blue.html"
        });
});