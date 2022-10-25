<?php

    include_once './../config/PDO.class.php';

    $datos = $_REQUEST;
    $pdo = new PDOClass($datos['host'], $datos['base'], $datos['usuario'], $datos['clave']);

    $query = file_get_contents($datos['archivo']);

    $resultado = $pdo->getQuery($query);

    $resultado = json_encode($resultado);

    echo $resultado;

?>