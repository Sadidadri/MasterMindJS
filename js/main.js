/**
 * Script que gestiona la ventana donde se crea el jeugo masterMind.
 * 
 * @author Adrián Ángel Moya Moruno
 */
{
    //Esta ruta para pruebas locales
    //let ruta = "file://"+window.location.pathname; 
    //ruta = ruta.replace("index.html","img/");

    //Esta ruta para pruebas en el server github:
    let ruta = window.location.href+"img/";

    //Variables
    let cajaDeIntentos;
    let cajaDeCoincidencias;
    let botonesDeColores;
    let miembros;
    let barraCoincidencias;
    let numerosColor = {"rojo.png":0,"blanco.png":1,"negro.png":2,"amarillo.png":3,"naranja.png":4,"marron.png":5,"azul.png":6,"verde.png":7,1:"negro.png",2:"blanco.png",null:"empty.png"};

    let rellenaIntento = (e) =>{
        for (let miembro of miembros) {
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
        let combinacionJugador = [];
        let colorMiembro;
        for (let miembro of miembros) {
            if(miembro.src == ruta+"empty.png"){
                console.log("Se tienen que llenar los 4 huecos.");
                return;
            }
            colorMiembro = miembro.src.replace(ruta,"");
            combinacionJugador.push(numerosColor[colorMiembro]);
        }

        registraIntento();
        registraCoincidencia(combinacionJugador);
        limpiaLinea();
    }
    let compruebaEstadoPartida = (cadenaCoincidencia) =>{
        if(cadenaCoincidencia == "1111"){
            console.log("¡Has ganado!");
        }
    }

    let registraIntento = () =>{
        let divIntento = document.createElement("div");
        let color;
        for (let miembro of miembros) {
            color = document.createElement("img");
            color.src=miembro.src;
            divIntento.appendChild(color);
        }
        cajaDeIntentos.appendChild(divIntento);
    }
    let registraCoincidencia = (combinacionJugador) =>{
        let cadenaCoincidencia = "";
        let resultado = masterMind.comprobarCoincidencia(combinacionJugador);
        let divCoincidencia = document.createElement("div");
        let color;
        for (let c of resultado) {
            color = document.createElement("img");
            color.src= ruta+numerosColor[c];
            divCoincidencia.appendChild(color);
            cadenaCoincidencia += c;
        }
        cajaDeCoincidencias.appendChild(divCoincidencia);
        compruebaEstadoPartida(cadenaCoincidencia);
    }
    let limpiaLinea = ()=>{
        for (let miembro of miembros) {
            miembro.src = ruta+"empty.png";
        }
    }
    let limpiaTablero = () =>{
        
        //Esto limpia los dos divs
        while (cajaDeIntentos.firstChild) {
          cajaDeIntentos.removeChild(cajaDeIntentos.firstChild);
        }
        while (cajaDeCoincidencias.firstChild) {
            cajaDeCoincidencias.removeChild(cajaDeCoincidencias.firstChild);
        }

    }

    let inicializarTablero = () =>{
        let divPanelJugador = document.createElement("div");
        let color;
        for (let i = 0; i<masterMind.SECUENCIA;i++) {
            color = document.createElement("img");
            color.src=ruta+"empty.png";
            color.className="miembros";
            divPanelJugador.appendChild(color);
        }
        cajaDeIntentos.appendChild(divPanelJugador);
        
        let divCoincidenciasInicial = document.createElement("div");
        for (let i = 0; i<masterMind.SECUENCIA;i++) {
            color = document.createElement("img");
            color.src=ruta+"empty.png";
            color.className="coincidencia";
            divCoincidenciasInicial.appendChild(color);
        }
        cajaDeCoincidencias.appendChild(divCoincidenciasInicial);
    }

    let reinicioPartida = () =>{
        masterMind.init();
        limpiaLinea();
        limpiaTablero();
        inicializarTablero();
    }

    let inicio = () => {
        //Genera una combinacion al abrir el programa
        masterMind.init();

        //Obtener elementos del entorno grafico
        document.getElementById("comprobarJugada").addEventListener("click",compruebaJugada);
        document.getElementById("reiniciarPartida").addEventListener("click",reinicioPartida);
        botonesDeColores = document.getElementsByClassName("botonColor");
        miembros = document.getElementsByClassName("miembros");
        barraCoincidencias = document.getElementsByClassName("coincidencia")
        cajaDeIntentos = document.getElementById("intentosUsuario");
        cajaDeCoincidencias = document.getElementById("coincidenciasUsuario");

        //For que añade funcionalidad a los colores de la derecha
        for (let botonColor of botonesDeColores) {
            botonColor.addEventListener("click",rellenaIntento)
        }
        //For que añade la funcionalidad para borrar elementos del intento
        for (let miembro of miembros) {
            miembro.addEventListener("click",borraIntento);
        }

    }

    document.addEventListener("DOMContentLoaded",inicio);
}