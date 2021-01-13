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


        function login($meno, $heslo) {
            $sql = $this->db->prepare("SELECT * FROM user WHERE meno like :meno and heslo like :heslo");
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

        function nacitajObsahKontakt() {
            $sql = $this->db->prepare("SELECT * FROM obsah");
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
    }
?>