regCTRL = function($scope, $http, prihlUzivatel) {
    $scope.uzivatel;
    $scope.zobrazEror = false;
    $scope.uzivatel = prihlUzivatel;


    $scope.klikPrihlasit = function(name, password) {
        $scope.pdata = $.param({
            meno: name,
            heslo: password,
        });
        $http({
            method: 'POST',
            url: 'Login/prihlasit.php',
            data: $scope.pdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            if (value.data == null) {
                $scope.zobrazEror = true;
            } else {
                $scope.zobrazEror = false;
                prihlUzivatel.set(value.data);
            }
        });
    }
}

app.controller("regCTRL", regCTRL);