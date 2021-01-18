<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->register($_POST["meno"], $_POST["heslo"], $_POST["email"]));
    } catch (Exception $e) {
        echo json_encode($e);
    }
?>