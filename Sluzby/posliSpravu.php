<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->posliSpravu($_POST["text"], $_POST["meno"], $_POST["id"]));
    } catch (Exception $e) {
        echo json_encode($e);
    }
?>