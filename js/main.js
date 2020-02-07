/**
 * Script que se encarga de la interfaz de usuario del juego Master Mind
 * 
 * @author Adrián Ángel Moya Moruno
 */
{

    //Variables
    let ventanaDeJuego;
    let panelJugadorInicial;
    let panelJugador;
    let linea;
    let botonesDeColores;
    let miembros;
    let numerosColor = {"red":0,"white":1,"black":2,"yellow":3,"orange":4,"brown":5,"blue":6,"green":7,1:"black",2:"white",null:"gray"};

    let compruebaJugada = () =>{
        let combinacionJugador = [];
        for (let i = 0; i < masterMind.NUM_CIRCULOS; i++) {
            if(miembros[i].getAttribute("fill") === "gray"){
                alert("Se tienen que llenar los 4 huecos.");
                return;
            }
            combinacionJugador.push(numerosColor[miembros[i].getAttribute("fill")]);
        }
        
        registraCoincidencia(combinacionJugador);
        
    }
    let registraCoincidencia = (combinacionJugador) =>{
        let resultado = masterMind.comprobar(combinacionJugador);
        for (let i = 0; i < masterMind.NUM_CIRCULOS; i++) {
            barraCoincidencias[i].setAttribute("fill",numerosColor[resultado[i]]);
        }
        registraIntento();
        limpiaLinea();
        compruebaEstadoPartida(resultado);
    }
    let registraIntento = () =>{
        let divLinea = linea.cloneNode(true);
        panelJugador.appendChild(divLinea);
        //panelJugador.insertBefore(divLinea,linea);
    }
    let compruebaEstadoPartida = (arrayIntento) =>{
        if(JSON.stringify(arrayIntento) === JSON.stringify([1,1,1,1])){ //Stringify permite pasar el array a cadena y asi poder comparar ambos
            console.log("¡Has ganado!");
        }
    }
    let limpiaLinea = ()=>{
        for (let i = 0;i< masterMind.NUM_CIRCULOS;i++) {
            miembros[i].setAttribute("fill","gray");
            barraCoincidencias[i].setAttribute("fill","gray");
        }
    }

    let rellenaIntento = (e) =>{
        for (let i = 0;i< masterMind.NUM_CIRCULOS;i++) {
            if(miembros[i].getAttribute("fill") === "gray"){
                miembros[i].setAttribute("fill",e.target.getAttribute("fill"));
                return;
            }
        }
    }
    let borraIntento = (e) =>{
        e.target.setAttribute("fill","gray");
    }

    let limpiaTablero = () =>{
        ventanaDeJuego.removeChild(panelJugador);
        let nuevoPanel = panelJugadorInicial.cloneNode(true);
        ventanaDeJuego.prepend(nuevoPanel);
    }
    let reinicioPartida = function () {
        limpiaTablero();
        inicio();
    };

    let inicio = () => {
        //Genera una combinacion al abrir el programa
        masterMind.init();

        //Obtener elementos del entorno grafico
        document.getElementById("compruebaBoton").addEventListener("click",compruebaJugada);
        document.getElementById("botonReinicio").addEventListener("click",reinicioPartida);
        ventanaDeJuego = document.getElementById("ventanaDeJuego");
        botonesDeColores = document.getElementsByClassName("paleta");
        panelJugador = document.getElementById("panelJugador");
        linea = document.getElementById("linea");
        miembros = document.getElementsByClassName("elementoCombinacion");
        barraCoincidencias = document.getElementsByClassName("elementoSolucion")
        
        
        //For que añade funcionalidad a los colores de la derecha
        for (let botonColor of botonesDeColores) {
            botonColor.addEventListener("click",rellenaIntento)
        }
        //For que añade la funcionalidad para borrar elementos del intento
        for (let miembro of miembros) {
            miembro.addEventListener("click",borraIntento);
        }

        //Hago una copia del juego inicialmente para luego colocarlo en caso de reinicios
        panelJugadorInicial = panelJugador.cloneNode(true);
    }

    document.addEventListener("DOMContentLoaded",inicio)
}