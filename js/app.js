//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const resetForm = document.querySelector('#limpiar');
const borrarTweets = document.querySelector('#borrarTodo');
let tweets = [];
//event listeners
eventListeners();
function eventListeners() {
  formulario.addEventListener('submit', agregarTweet);
  //Cuando el documento esta listo carga los Tweets del LS
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    crearHTML();
    setFocusToTextBox();
  });
  resetForm.addEventListener('click', limpiarForm);
  borrarTweets.addEventListener('click', borrarTodo);
}
//Funciones
function setFocusToTextBox() {
  document.querySelector('#tweet').focus();
}
function limpiarForm(e) {
  e.preventDefault();
  formulario.reset();
  setFocusToTextBox();
}
function agregarTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector('#tweet').value;
  //validacon
  if (tweet === '') {
    mostrarError('No puede ir vacio');
    return;
  }
  const tweetObj = {
    id: Date.now(),
    texto: tweet,
  };
  //añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];
  //Crear HTML
  crearHTML();
  //Reiniciar fomrulario
  formulario.reset();
  setFocusToTextBox();
}
function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('error');
  //Insertar en el contendio
  const contenido = document.querySelector('#form');
  contenido.appendChild(mensajeError);
  //Borrar mensaje despues de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}
function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach(tweet => {
      //agregar boton eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'x';
      //añadir funcion eliminar tweet
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };
      //crear HTMl
      const li = document.createElement('li');
      li.innerText = tweet.texto;
      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
function borrarTweet(idTweet) {
  tweets = tweets.filter(tweet => tweet.id !== idTweet);
  sincronizarStorage();
  crearHTML();
  setFocusToTextBox();
}
function borrarTodo(e) {
  e.preventDefault();
  limpiarHTML();
  tweets = [];
  localStorage.removeItem('tweets');
}
