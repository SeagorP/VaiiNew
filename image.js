imgCTRL = function ($scope, $http, prihlUzivatel) {
    $scope.uzivatel = prihlUzivatel;
    $scope.nameImg = [];
    $scope.tempI = 0;
    $scope.obsah = null;
    $scope.serObsah = null;
    $scope.aktServ = -1;

    $scope.servNameImg;

    //GALERIA
    $scope.nacitajGal = function() {
        $http({
            method: 'GET',
            url: 'Galeria/nacitajGal.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            $scope.obsah = value.data;
        });
    }
    $scope.nacitajGal();

    $scope.refresh = function() {
        $scope.obsah = null;
        $scope.serObsah = null;
        $scope.nacitajGal();
        $scope.nacitajServ();
    }

    $scope.zmazObrazok = function(image) {
        var temp = confirm("Naozaj chcete odstránit tento prvok ?");

        if (temp) {
            $scope.pdata = $.param({
                id: image.id_img,
            });
            $http({
                method: 'POST',
                url: 'Galeria/zmazObrazok.php',
                data: $scope.pdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                angular.forEach($scope.obsah, function(item, idx) {
                    if (item == image) {
                        $scope.obsah.splice(idx, 1);
                    }
                });
            });
        }  
    }

    $scope.nahrajObrazok = function() {
        $scope.tempI = 0;
        for(var i = 0; i < document.querySelector('#uploadfile').files.length; ++i)
        {
            var image = document.querySelector('#uploadfile').files[i];
            if (image == null) {
                console.log("Data su null");
            } else {
                $scope.nameImg.push(image.name);
                getBase64(image).then(function(data) {
                    data = data.replace(/^data:image\/\w+;base64,/, "");
                    $scope.sendToDB(data, $scope.nameImg[$scope.tempI]);
                    $scope.tempI++;
                });
            }
        }
    };

    $scope.sendToDB = function(data, name) {
        $scope.pData = $.param({
            imgName: name,
            image: data,
        });
        $http({
            method: 'POST',
            url: 'Galeria/pridajObrazok.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            if (value.data == - 1) {
                alert("Obrázok sa nepodarilo vložiť !");
            }
            $scope.refresh();
        }, function() { });
    }

    //SLUZBY
    $scope.otvorServ = function(service) {
        $scope.aktServ = service.id_obsah;
    }

    $scope.zatvorServ = function() {
        $scope.aktServ = -1;
    }

    $scope.nacitajServ = function() {
        $http({
            method: 'GET',
            url: 'Sluzby/nacitajSlu.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            $scope.serObsah = value.data;
        });
    }
    $scope.nacitajServ();

    $scope.nahrajSluzbu = function(nazov, text) {
        var image = document.querySelector('#uploadService').files[0];
        if (image == null) {
            console.log("Data su null");
        } else {
            $scope.servNameImg = image.name;
            getBase64(image).then(function(data) {
                data = data.replace(/^data:image\/\w+;base64,/, "");
                $scope.sendServToDB(data, $scope.servNameImg, nazov, text);
            });
        }
    };

    $scope.sendServToDB = function(data, imgNazov, popis, obsah) {
        $scope.sData = $.param({
            imgName: imgNazov,
            image: data,
            nazov: popis,
            text: obsah
        });
        $http({
            method: 'POST',
            url: 'Sluzby/pridajSlu.php',
            data: $scope.sData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            if (value.data == - 1) {
                alert("Sluzbu sa nepodarilo vložiť !");
            }
            $scope.refresh();
        }, function() { });
    }

    $scope.zmazServ = function(service) {
        var temp = confirm("Naozaj chcete odstránit tento prvok ?");

        if (temp) {
            $scope.pdata = $.param({
                id: service.id_obsah,
            });
            $http({
                method: 'POST',
                url: 'Sluzby/zmazSlu.php',
                data: $scope.pdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                angular.forEach($scope.serObsah, function(item, idx) {
                    if (item == service) {
                        $scope.serObsah.splice(idx, 1);
                    }
                });
            });
        }  
    }




    // Z Internetu
    function getBase64(image) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
}

app.controller("imgCTRL", imgCTRL);