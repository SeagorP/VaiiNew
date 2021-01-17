<?php
    class Database {
        private $db;
        private $database = "web_vaii";

        public function __construct()
        {
            $servername = "localhost";
            $username = "root";
            $password = "";

            $this->db = new PDO("mysql:host=$servername;dbname=$this->database", $username, $password);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        function __destruct() {
            $this->db = null;
        }

        ///LOGIN
        function login($meno, $heslo) {
            $sql = $this->db->prepare("SELECT id, meno, email, prava FROM user WHERE meno like :meno and heslo like :heslo");
            $sql->bindValue(":meno", $meno);
            $sql->bindValue(":heslo", $heslo);
            $sql->execute();

            if($sql->rowCount() > 0) {
                $result = $sql->fetch(PDO::FETCH_ASSOC);
                return $result;
            } else {
                return null;
            }
        }

        ///Správa kontakt
        function nacitajObsahKontakt() {
            $sql = $this->db->prepare("SELECT id_obsah, popis, text FROM obsah WHERE id_obsah != ANY (SELECT id_obsah FROM image)");
            $sql->execute();
            $data = [];

            while($row = $sql->fetch(PDO::FETCH_ASSOC))
            {
                $data[] = $row;
            }
            return $data;
        } 

        function zmazObsahKontakt($id) {
            $sql = $this->db->prepare("DELETE FROM obsah where id_obsah = :id");
            $sql->bindValue(":id", $id);
            $sql->execute();
            return $sql->rowCount();
        } 
        
        function upravObsahKontakt($id, $popis, $obsah) {
            $sql = $this->db->prepare("UPDATE obsah SET popis = :popis, text = :obsah where id_obsah = :id");
            $sql->bindValue(":id", $id);
            $sql->bindValue(":popis", $popis);
            $sql->bindValue(":obsah", $obsah);
            $sql->execute();
           
            return $sql->rowCount();
        } 

        function pridajObsah($popis, $obsah) {
            $sql = $this->db->prepare("INSERT INTO obsah VALUES (NULL, :popis, :obsah);");
            $sql->bindValue(":popis", $popis);
            $sql->bindValue(":obsah", $obsah);
            $sql->execute();

            return $this->db->lastInsertId();
        }
        
        ///Galeria    
        function pridajObrazok($imgName, $image) {
            return $this->addImage($imgName, $image, -1);
        }

        function nacitajObrazkyGal() {
            $sql = $this->db->prepare("SELECT * FROM image WHERE id_obsah IS NULL");
            $sql->execute();
            $data = [];

            while($row = $sql->fetch(PDO::FETCH_ASSOC))
            {
                $data[] = $row;
            }
            return $data;
        } 

        function zmazObrazokGal($id) {
            return $this->deleteImage($id, true);
        }

        ///Sluzby 
        function pridajSluzbu($imgName, $image, $nazov, $text) {
            if (isset($_POST["imgName"]) && isset($_POST["image"]) && isset($_POST["nazov"]) && isset($_POST["text"]))
            {
                $tempId = $this->pridajObsah($nazov, $text);
                if($this->addImage($imgName, $image, $tempId) == -1) {
                    $this->zmazObsahKontakt($tempId);
                    return -1;
                }
                return 1;
            } 
            return -1;
        }
        function nacitajSluzbu() {
            $sql = $this->db->prepare("SELECT * FROM obsah JOIN image USING(id_obsah)");
            $sql->execute();
            $data = [];

            while($row = $sql->fetch(PDO::FETCH_ASSOC))
            {
                $data[] = $row;
            }
            return $data;
        }
        function zmazSluzbu($id) {
            $sql = $this->db->prepare("DELETE FROM chat where id_obsah = :id");
            $sql->bindValue(":id", $id);
            $sql->execute();

            $this->deleteImage($id, false);
            $this->zmazObsahKontakt($id);
        }

        //Chat
        
        function nacitajChat($id) {
            $sql = $this->db->prepare("SELECT meno, textSpravy, date FROM chat JOIN user USING(meno) JOIN obsah USING(id_obsah) WHERE :id = id_obsah ORDER BY date ASC");
            $sql->bindValue(":id", $id);
            $sql->execute();
            $data = [];

            while($row = $sql->fetch(PDO::FETCH_ASSOC))
            {
                $data[] = $row;
            }
            return $data;
        }

        function posliSpravu($text, $meno, $id) {
            $sql = $this->db->prepare("INSERT INTO chat VALUES (NULL, :meno, :idObsah, :sprava, NULL);");
            $sql->bindValue(":meno", $meno);
            $sql->bindValue(":idObsah", $id);
            $sql->bindValue(":sprava", $text);
            $sql->execute();

            return $this->db->lastInsertId();

        }

        //Spolocne
        function addImage($imgName, $image, $id) {
            if (isset($_POST["image"])) {
                $sql = $this->db->prepare("SELECT * FROM image WHERE meno like :meno;");
                $sql->bindValue(":meno", $imgName);
                $sql->execute();
                
                if ($sql->rowCount() != 0) {
                    return -1;
                }

                if($id == -1) {
                    $sql = $this->db->prepare("INSERT INTO image VALUES (NULL, NULL, :meno);");
                    $sql->bindValue(":meno", $imgName);
                } else {
                    $sql = $this->db->prepare("INSERT INTO image VALUES (NULL, :obsahId, :meno);");
                    $sql->bindValue(":meno", $imgName);
                    $sql->bindValue(":obsahId", $id);
                } 
                $sql->execute();
                file_put_contents('../Styles/Galery/'.$imgName, base64_decode($image));
                return 1;
            }
            return -1;
        }

        function deleteImage($id, $podlaCoho) {
            if ($podlaCoho) {
                $sql = $this->db->prepare("SELECT meno FROM image where id_img = :id");
                $sql->bindValue(":id", $id);
            } else {
                $sql = $this->db->prepare("SELECT meno FROM image where id_obsah = :id");
                $sql->bindValue(":id", $id);
            }
            
            $sql->execute();
            $row = $sql->fetch(PDO::FETCH_ASSOC);
            unlink('../Styles/Galery/'.$row["meno"]);

            if ($podlaCoho) {
                $sql = $this->db->prepare("DELETE FROM image where id_img = :id");
                $sql->bindValue(":id", $id);
            } else {
                $sql = $this->db->prepare("DELETE FROM image where id_obsah = :id");
                $sql->bindValue(":id", $id);
            }
    
            $sql->execute();
            return $sql->rowCount();
        }
    }
?>