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

prihlUzivatel = function() {
    return {
        user: angular.fromJson(sessionStorage.user),
        set: function(uzivatel) {
            this.user = uzivatel;
            sessionStorage.user = angular.toJson(this.user);
        }
    }
}

app.factory("prihlUzivatel", prihlUzivatel);
app.config(pages);