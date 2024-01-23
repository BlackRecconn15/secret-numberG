
let secretNumber = 0;
let tries = 0;
let listaNumerosSorteados = [];
let maxNumbers = 10; 

//Funcion para asignar texto a los elementos
function asignarTexto(element, text) {
    //recibe el elemento y el texto a cambiar 
    let elementHTML = document.querySelector(element);
    elementHTML.innerHTML = text;
    return;
}

function generateSecretNumber() {
    //generamos un numero aleatorio
    numeroGenerado = Math.floor(Math.random()*maxNumbers)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length == maxNumbers) {
        asignarTexto('p', 'Ya se han sorteado todos los numeros posibles');
    }else {
         //Si el numero generado ya esta en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generateSecretNumber();
        } else {
            //Sino, lo agregamos a la lista de numeros
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

function verificarIntento() {
    //Obtenemos el numero del jugador
    let userNumber = parseInt(document.getElementById('userValue').value);

    //Comparamos el numero del usuario con el secreto
    if (userNumber == secretNumber){
        //Si es correcto, cambiamos el mensaje y habilitamos el boton 'nuevo juego'
        asignarTexto('p', `Adivinaste el numero en ${tries} ${tries == 1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        //Si es incorrecto, le damos pistas del numero secreto
        if (userNumber > secretNumber){
            asignarTexto('p', 'El numero secreto es menor');
        }else {
            asignarTexto('p', 'El numero secreto es mayor');
        }
        //Al mismo tiempo sumas sus intentos y limpiamos la caja
        tries++;
        cleanInput();

        //Si son mas de 3 intentos
        if(tries > 3) {
            //cambiamos el texto
            //Habilitamos el boton 'nuevo juego'
            //Desabilitamos el boton 'intentar'
            //Resetemos la lista de numeros 
           tryReset()
        }
    }
    return;
}

function tryReset(){
    asignarTexto('p', 'Has alcanzado el maximo de intentos por numero');
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('intento').setAttribute('disabled', 'true');
    listaNumerosSorteados = [];
}

function cleanInput() {
    //Limpiamos el input del usuario
    document.querySelector('#userValue').value = '';
}
function initialConditions() {
    asignarTexto('h1', "Adivina el numero secreto");
    asignarTexto('p', `Escribe un numero del 1 al ${maxNumbers}`);
    secretNumber = generateSecretNumber();
    tries = 1;
}


function rebootGame(){
    //Limnpiamos la caja
    cleanInput();
    //Reiniciamos los textos
    //Asignamos un nuevo numero
    //Reiniciamos los intentos
    initialConditions()
    //Desabilitamos el boton de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('intento').removeAttribute('disabled');
}

initialConditions()