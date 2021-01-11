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
    }
?>