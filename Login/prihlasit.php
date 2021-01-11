<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->login($_POST["meno"], $_POST["heslo"]));
    } catch (Exception $e) {
        echo json_encode($e);
    }
?>