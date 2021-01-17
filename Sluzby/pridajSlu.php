<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->pridajSluzbu($_POST["imgName"], $_POST["image"], $_POST["nazov"], $_POST["text"]));
    } catch (Exception $e) {
        echo json_encode($e);
    }
?>