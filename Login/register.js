regCTRL = function($scope, $http) {
    $scope.uzivatel = angular.fromJson(sessionStorage.uzivatel);

    $scope.klikPrihlasit = function() {
        console.log($scope.name);
        console.log($scope.password);

        $scope.pdata = $.param({
            meno: $scope.name,
            heslo: $scope.password,
        });

        $http({
            method: 'POST',
            url: 'Login/prihlasit.php',
            data: $scope.pdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            $scope.uzivatel = value.data;
            sessionStorage.uzivatel = angular.toJson($scope.uzivatel);
            console.log(value);
        });
    }
}

app.controller("regCTRL", regCTRL);