<?php

    $datos = $_REQUEST;
    $ruta = $datos['ruta'];
    $archivos = scandir($ruta);

    echo json_encode($archivos);
?>