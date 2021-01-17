hlavickaCTRL = function($scope, $sce, $compile, $templateRequest) {
    $scope.uzivatel;

    $scope.zobrazHlavicku = function() {
        var loadAPI = $sce.getTrustedResourceUrl('Hlavicka/hlavicka.html');
        $templateRequest(loadAPI).then(function (result) {
            $compile($("#hlavicka").html(result).contents())($scope);
        });
    };
    $scope.zobrazHlavicku();
}


udCTRL = function($scope, prihlUzivatel) {
    $scope.uzivatel = prihlUzivatel;

    $scope.odhlasenie = function() {
        console.log($scope.uzivatel);
        prihlUzivatel.set(null);
        alert("Uspešne ste sa odhlásili.");
    }
}

app.controller("udCTRL", udCTRL);
app.controller("hlavickaCTRL", hlavickaCTRL);