const obtenerArchivos = ( ruta, nombre, orden) => {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let datos = xmlhttp.responseText;
            datos = JSON.parse(datos);
            
            let templateAcordion = document.querySelector('#acordion').innerHTML;
            
            templateAcordion = templateAcordion.replace(/{nombre}/g, nombre);
            templateAcordion = templateAcordion.replace(/{numero}/g, orden);
        
            document.querySelector('#accordionExample').innerHTML = templateAcordion;
            
            let templateTabla = document.querySelector("#tabla").innerHTML;
            let tabla = '';

            datos.map( (e, i) => {
                if( e.indexOf('.sql') != -1 ){
                    tabla += templateTabla;
                    tabla = tabla.replace(/{nombre}/g, e);
                    tabla = tabla.replace(/{ruta}/g, ruta);
                }
            });
            
            document.querySelector(`#tabla${orden} tbody`).innerHTML = tabla;

        }
    }

    xmlhttp.open("POST", "http://localhost/database_import/php/files.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("ruta="+ruta);
}

const buscarArchivos = ( ruta, nombre, orden ) => {
    obtenerArchivos( ruta, nombre, orden );
}

const ejecutarArchivo = ( archivo ) => {
    let host = document.querySelector('#host').value;
    let base = document.querySelector('#base').value;
    let usuario = document.querySelector('#usuario').value;
    let clave = document.querySelector('#clave').value;

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let datos = xmlhttp.responseText;
            if(datos == "false"){
                alert('ok');
            }else{
                alert('error');
            }
        }
    }

    xmlhttp.open("POST", "http://localhost/database_import/php/execute.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(`host=${host}&base=${base}&usuario=${usuario}&clave=${clave}&archivo=${archivo}`);
}