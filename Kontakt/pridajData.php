<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->pridajObsah($_POST["popis"], $_POST["obsah"]));
    } catch (Exception $e) {
        echo json_encode($e);
    }
?>