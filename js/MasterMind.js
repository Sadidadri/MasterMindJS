/**
 * Objeto que se encarga de crear el Juego MasterMind
 */
let masterMind = (function () {

    const NUM_CIRCULOS = 4;
    let objetivo;


    let init = function () {
        /**
         * Colores:
         * 0 - Rojo
         * 1 - Blanco
         * 2 - Negro
         * 3 - Amarillo
         * 4 - Naranja
         * 5 - Marrón
         * 6 - Azul
         * 7 - Verde
         */

        let combinacionAleatoria = [];
        //Se genera array de numeros aleatorios
        for (let i = 0; i < NUM_CIRCULOS; i++) {
            combinacionAleatoria.push(parseInt(Math.random() * 8));
        }

        objetivo = combinacionAleatoria;
    }
    let mostrar = function () { 
        return objetivo;
    }
    let comprobar = function (intento) { 
        /**
         * Colores:
         * Null - Nada
         * 1 - Negro
         * 2 - Blanco
         * 
         */
        let coincidencia = [null, null, null, null];
        let copiaObjetivo = objetivo.slice(0);

        //Comprobacion de Negros
        for (let i = 0; i < NUM_CIRCULOS; i++) {
            if (intento[i] === objetivo[i]) {
                coincidencia[i] = 1;
                intento[i] = null;
                copiaObjetivo[i] = undefined;
            }
        }

        //Comprobacion de Blancos
        for (let i = 0; i < intento.length; i++) {
            if (intento[i] != null) {
                for (let j = 0; j < copiaObjetivo.length; j++) {
                    if (intento[i] == copiaObjetivo[j]) {
                        coincidencia[i] = 2;
                    }
                }
            }
        }

        //Coloca los negros primeros, y luego los blancos
        coincidencia.sort();
        return coincidencia;
    }
    
    return {
        init: init,
        comprobar: comprobar,
        mostrar: mostrar,
        NUM_CIRCULOS: NUM_CIRCULOS
    }
})(); 
