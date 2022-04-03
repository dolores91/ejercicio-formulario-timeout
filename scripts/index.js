// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
    usuarios: [{
            id: 1,
            name: "Steve Jobs",
            email: "steve@jobs.com",
            password: "Steve123",
        },
        {
            id: 2,
            name: "Ervin Howell",
            email: "shanna@melissa.tv",
            password: "Ervin345",
        },
        {
            id: 3,
            name: "Clementine Bauch",
            email: "nathan@yesenia.net",
            password: "Floppy39876",
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            email: "julianne.oconner@kory.org",
            password: "MysuperPassword345",
        },
    ],
};

/* 
TIPS:
  - Puedes averiguar acerca de la manera de validar el formato de un email utilizando Javascript, buscando
    en internet frases como "Validar email con Javascript o similar".

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y  estilos predefinidos para ayudarte a completar la actividad.

  - También te dejamos algunos mensajes que te pueden ser de utilidad:
  
   Mensaje de error => <small>Alguno de los datos ingresados son incorrectos</small>

   Mensaje de bienvenida => "<h1> Bienvenido al sitio 😀 </h1>";

   ¡Manos a la obra!
 */

window.onload = () => {

    const form = document.forms.login;
    const password = form.password;
    const btnIniciarSesion = form.querySelector("button.login-btn");
    // 1) Escuchar el evento necesario para reaccionar cuando la persona
    // haga click en el botón iniciar sesión.
    btnIniciarSesion.onclick = event => {
        event.preventDefault();
        iniciarSesion(form.email.value, password.value); //aca llama a la funcion de abajo->
    };

    password.onkeypress = event => {
        if (event.key === "Enter") {
            iniciarSesion(form.email.value, password.value);
        }
    };

};
// 2) El proceso de inicio de sesión deberá tener una demora de 3 segundos.
// Deberás agregar la función correspondiente para simular dicha demora.
// 3) Durante el tiempo indicado anteriormente, se deberá mostrar el mensaje "Iniciando sesión..."
function iniciarSesion(email, password) {
    const errorContainer = document.querySelector("#error-container");
    errorContainer.classList.add("hidden");
    document.querySelector("#loader").classList.remove("hidden");
    setTimeout(() => {
        document.querySelector("#loader").classList.add("hidden");
        if (validarDatos(email, password)) {
            loginExitoso();
        } else {
            errorContainer.classList.remove("hidden");
            errorContainer.innerHTML = "<small>Alguno de los datos ingresados son incorrectos</small>";
        }
    }, 3000);
}

// 4) A partir de los inputs ingresados en el formulario, se deberan realizar las siguientes validaciones:
// 1) Que el primer input sea un email válido.
// 2) Que la contraseña tenga al menos 5 caracteres.
// 3) Que los datos ingresados corresponden a una
// persona que se encuentre registrada en la base de datos.
// En caso de que alguna de las validaciones no sea exitosa,
// se deberá mostrar un mensaje de error que diga "Alguno de los datos ingresados son incorrectos"

//llama a todas las validaciones->
function validarDatos(email, password) {
    const mailEsValido = validarEmail(email);
    const passEsValida = validarPassword(password);
    const existeUsr = existeUsuario(email, password);
    return mailEsValido && passEsValida && existeUsr;
}

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9.!]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/g;
    return regex.test(email);
}

function validarPassword(password) {
    const regex = /^[a-zA-Z0-9]{5,}/g; //otra forma de validad longitud!!
    return regex.test(password);
}

function existeUsuario(email, password) {
    const usuario = baseDeDatos.usuarios.find(usr => usr.email === email && usr.password === password);
    return usuario !== undefined;
}

// 5) En caso de que los datos ingresados sean correctos, se deberá ocultar el formulario y mostrar
// un mensaje de bienvenida al sitio.
function loginExitoso() {
    document.forms.login.classList.add("hidden");
    document.querySelector("h1").innerText = "Bienvenido al sitio 😀";
}