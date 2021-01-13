var app = angular.module("mojWeb", ["ngRoute"]);


pages = function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Home/home.html",
    })
    .when("/login", {
        templateUrl: "Login/prihlasenie.html",
    })
    .when("/register", {
        templateUrl: "Login/registracia.html",
    })
    .when("/kontakt", {
        templateUrl: "Kontakt/kontakt.html",
    })
    .when("/sluzby", {
        templateUrl: "Sluzby/sluzby.html",
    })
    .when("/galeria", {
        templateUrl: "Galeria/galeria.html",
    });
}

app.config(pages);