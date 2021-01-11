hlavickaCTRL = function($scope, $sce, $compile, $templateRequest) {
    $scope.zobrazHlavicku = function() {
        var loadAPI = $sce.getTrustedResourceUrl('Hlavicka/hlavicka.html');
        $templateRequest(loadAPI).then(function (result) {
            $compile($("#hlavicka").html(result).contents())($scope);
        });
    };
    $scope.zobrazHlavicku();
}

app.controller("hlavickaCTRL", hlavickaCTRL);