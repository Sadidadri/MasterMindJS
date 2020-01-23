/**
 * Objeto que se encarga de crear el Juego MasterMind
 */

let masterMind = {
    SECUENCIA:4,
    objetivo:null,
    init(){
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

         for (let i = 0; i<this.SECUENCIA ; i++) {
             combinacionAleatoria.push(parseInt(Math.random()*8));
         }
         this.objetivo = combinacionAleatoria;
    },
    mostrar(){
        return this.objetivo;
    },
    comprobarCoincidencia(intento){
        /**
         * Colores:
         * Null - Nada
         * 1 - Negro
         * 2 - Blanco
         * 
         */
        let coincidencia = [null,null,null,null];
        let copiaObjetivo = this.objetivo.slice(0);
        
        //Comprobacion de Negros
        for (let i = 0; i < this.SECUENCIA; i++) {
            if(intento[i] === this.objetivo[i]){
                coincidencia[i] = 1;
                intento[i] = null;
                copiaObjetivo[i] = undefined;
            }
        }

        //Comprobacion de Blancos
        for (let i = 0; i < intento.length; i++) {
            if(intento[i] != null){
                for(let j = 0;j< copiaObjetivo.length;j++){
                    if(intento[i] == copiaObjetivo[j]){
                        coincidencia[i] = 2;
                        copiaObjetivo[j] = undefined;
                    }
                }
            }
        }

        //Coloca los negros primeros, y luego los blancos
        coincidencia.sort();
        return coincidencia;
    }
}


/* let masterMind = {function(){

    return{
        init:init,
        comprobar:comprobar,
        mostrar:mostrar
    }
}}(); */
