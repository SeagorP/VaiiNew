regCTRL = function($scope, $http, prihlUzivatel) {
    $scope.uzivatel;
    $scope.uzivatel = prihlUzivatel;

    //erory
    $scope.zobrazEror = false;
    $scope.zobrazErorName = false;
    $scope.zobrazErorHeslo = false;
    $scope.zobrazErorHesloConf = false;
    $scope.zobrazErorEmail = false;
    $scope.zobrazErorLic = false;

    
    $scope.zobrazErorMenoUniqe = false;
    $scope.zobrazErorEmailUniqe = false;
    



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

    $scope.klikRegistracia = function(name, password, passwordConf, email) {
        $scope.zobrazErorMenoUniqe = false;
        $scope.zobrazErorEmailUniqe = false;
        var checkLic = document.querySelector('input[id="checkLic"]');
        if(name != null) {
            $scope.zobrazErorName = false;
            if(password != null) {
                $scope.zobrazErorHeslo = false;
                if(passwordConf == password) {
                    $scope.zobrazErorHesloConf = false;
                    if(email != null) {
                        $scope.zobrazErorEmail = false;
                        if(checkLic.checked) {
                            $scope.zobrazErorLic = false;
                            //register
                            $scope.pdata = $.param({
                                meno: name,
                                heslo: password,
                                email: email,
                            });
                            $http({
                                method: 'POST',
                                url: 'Login/registrovat.php',
                                data: $scope.pdata,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).then(function(value) {
                                if (value.data == -1) {
                                    $scope.zobrazErorMenoUniqe = true;
                                } else if (value.data == -2) {
                                    $scope.zobrazErorEmailUniqe = true;
                                } else {
                                    $("#regName").val('');
                                    $("#regPass").val('');
                                    $("#regPass2").val('');
                                    $("#regEmail").val('');
                                    alert("Úspešne ste sa zaregistrovali, prosím prihlaste sa.");
                                }
                            });
                        } else {
                            $scope.zobrazErorLic = true;
                        }
                    } else {
                        $scope.zobrazErorEmail = true;
                    }
                } else {
                    $scope.zobrazErorHesloConf = true;
                }
            } else {
                $scope.zobrazErorHeslo = true;
            }
        } else {
            $scope.zobrazErorName = true;
        }
    }
}

app.controller("regCTRL", regCTRL);