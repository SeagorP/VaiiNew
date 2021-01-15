imgCTRL = function ($scope, $http) {
    $scope.nameImg = [];
    $scope.tempI = 0;
    $scope.obsah = null;

    $scope.nacitajGal = function() {
        $http({
            method: 'GET',
            url: 'Galeria/nacitajGal.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            $scope.obsah = value.data;
            console.log(value);
        });
    }
    $scope.nacitajGal();

    $scope.refreshImg = function() {
        $scope.obsah = null;
        $scope.nacitajGal();
    }


    
    $scope.zmazObrazok = function(image) {
        var temp = confirm("Naozaj chcete odstránit tento prvok ?");

        if (temp) {
            $scope.pdata = $.param({
                id: image.id_img,
            });
            console.log("som tu");
            $http({
                method: 'POST',
                url: 'Galeria/zmazObrazok.php',
                data: $scope.pdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                console.log(value);
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
                    //console.log(image.name);
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
            console.log(value.data);
            console.log("koncim");
            //todo
        }, function() { });
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