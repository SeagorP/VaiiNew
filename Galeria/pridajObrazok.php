<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->pridajObrazok($_POST["imgName"], $_POST["image"]));
    } catch (Exception $e) {
        echo json_encode($e);
    }
?>