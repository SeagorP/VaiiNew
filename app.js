var app = angular.module("mojWeb", ["ngRoute"]);


pages = function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Home/home.html",
    })
    .when("/login", {
        templateUrl: "Login/prihlasenie.html",
    });
}

app.config(pages);