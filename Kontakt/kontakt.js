kontCTRL = function($scope, $http, prihlUzivatel) {
    $scope.uzivatel = prihlUzivatel;
    $scope.editing = -1;
    $scope.obsah = null;
    $scope.add = false;
    $scope.savePopis = null;
    $scope.saveText = null;

    $scope.edit = function(id) {
        $scope.editing = id;
    }

    $scope.nacitajData = function() {
        $http({
            method: 'GET',
            url: 'Kontakt/nacitajData.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            $scope.obsah = value.data;
            console.log(value);
        });
    }
    $scope.nacitajData();

    $scope.zmazData = function(prvok) {
        var temp = confirm("Naozaj chcete odstránit tento prvok ?");

        if (temp) {
            $scope.pdata = $.param({
                id: prvok.id_obsah,
            });

            $http({
                method: 'POST',
                url: 'Kontakt/zmazData.php',
                data: $scope.pdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                console.log(value);
                angular.forEach($scope.obsah, function(item, idx) {
                    if (item == prvok) {
                        $scope.obsah.splice(idx, 1);
                    }
                });
            });
        }  
    }

    $scope.saveBefUpd = function(item) {
        $scope.editing = item.id_obsah;
        $scope.savePopis = item.popis;
        $scope.saveText = item.text;
    }

    $scope.closeUpd = function(item) {
        $scope.editing = -1;
        item.popis = $scope.savePopis;
        item.text = $scope.saveText;
    }

    $scope.upravData = function(prvok) {
        $scope.pdata = $.param({
            id: prvok.id_obsah,
            popis: prvok.popis,
            obsah: prvok.text
        });

        $http({
            method: 'POST',
            url: 'Kontakt/updateData.php',
            data: $scope.pdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            console.log(value);
            $scope.editing = -1;
            if(value.data == 1) {
                alert("Prvok bol upravený!!");
            } else {
                alert("Nevykonala sa žiadna zmena!!");
            }
        });
    }

    $scope.pridaj = function() {
        $scope.add = !$scope.add;
    }
    
    $scope.vlozDb = function(newPopis, newText) {
        $scope.pdata = $.param({
            popis: newPopis,
            obsah: newText
        });

        $http({
            method: 'POST',
            url: 'Kontakt/pridajData.php',
            data: $scope.pdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            console.log(value.data);
            $scope.add = false;

            $scope.obsah.push({
                id_obsah: value.data,
                popis: newPopis,
                text: newText
            });
            alert("Prvok bol pridaný!!");
        });
    }   
}

app.controller("kontCTRL",kontCTRL);