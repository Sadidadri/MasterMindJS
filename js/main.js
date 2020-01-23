{
    //Esta ruta para pruebas locales
    //let ruta = "file://"+window.location.pathname; 
    //ruta = ruta.replace("index.html","img/");

    //Esta ruta para pruebas en el server github:
    let ruta = window.location.href+"img/";

    let botonesDeColores;
    let miembros;

    let rellenaIntento = (e) =>{
        console.log(e.target.src);
        for (let miembro of miembros) {
            console.log(miembro.src);
            if(miembro.src == ruta+"empty.png"){
                miembro.src = e.target.src;
                return;
            }
        }
        
    }

    let borraIntento = (e) =>{
        e.target.src = ruta+"empty.png";
    }
    let compruebaJugada = () =>{
        //Falta añadir funcionamiento
    }

    let reinicioPartida = () =>{
        masterMind.init();
        //Falta añadir limpieza del entorno gráfico.
    }

    let inicio = function() {
        //Genera una combinacion al abrir el programa
        masterMind.init();

        //Obtener elementos del entorno grafico
        document.getElementById("comprobarJugada").addEventListener("click",compruebaJugada);
        document.getElementById("reiniciarPartida").addEventListener("click",reinicioPartida);
        botonesDeColores = document.getElementsByClassName("botonColor");
        miembros = document.getElementsByClassName("miembros");

        //For que añade funcionalidad a los colores de la derecha
        for (let botonColor of botonesDeColores) {
            botonColor.addEventListener("click",rellenaIntento)
        }
        //For que añade la funcionalidad para borrar elementos del intento
        for (let miembro of miembros) {
            miembro.addEventListener("click",borraIntento);
        }

        console.log(ruta);
    }

    document.addEventListener("DOMContentLoaded",inicio);
}