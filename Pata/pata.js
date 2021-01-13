pataCTRL = function($scope, $sce, $compile, $templateRequest) {
    $scope.zobrazPata = function() {
        var loadAPI = $sce.getTrustedResourceUrl('Pata/pata.html');
        $templateRequest(loadAPI).then(function (result) {
            $compile($("#pata").html(result).contents())($scope);
        });
    };
    $scope.zobrazPata();
}

app.controller("pataCTRL", pataCTRL);