
/* Usado para generar el menu responsivo */
const checkbox = document.querySelector('#check');
const header = document.getElementById("header")

checkbox.addEventListener('click', () => {
  // Si el checkbox está marcado, agregamos la clase "active" al label
  if (checkbox.checked) {
    header.style.overflow = "auto"; /* overflow usado para poder scrolear en el menu responsive, */
    document.body.style.overflow = 'hidden'; /* overflow usado para no poder scrollear la pagina body mientras esta activo el menu resposive, o mas bien mientras este con el check el checkbox */
    
    header.classList.add('active');
  } else {
    // Si no está marcado, quitamos la clase "active" del label
    header.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});




   // Cuando se scrollea 20px por debajo de la parte superior, se muestra el boton automaticamente, de lo contrario no se ve
 window.onscroll = function() {scrollFunction()};

 function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
     document.getElementById("myBtn").style.display = "block";
   } else {
     document.getElementById("myBtn").style.display = "none";
   }
}

function topFunction() { /* usada unicamente para que el desplazamiento hacia la parte superior sea mas suave */
 window.scrollTo({
   top: 0,
   behavior: 'smooth'
 });
}






/* DARK MODE */
document.getElementById('dark-mode-button').addEventListener('click', function() {
  // Obtener la clase actual del elemento body
  dark = document.querySelector("#darkIcon"); // se le cambiara el icono de dark a light unicamente cambiando el texto
  var currentClass = document.body.classList.value;

  const titulo = document.querySelectorAll(".titulo");
  // Si el elemento body tiene la clase light-mode, cambiar a dark-mode
  // De lo contrario, cambiar a light-mode
  if (currentClass === 'light-mode') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    dark.textContent = "light_mode"
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    dark.textContent = "dark_mode"
  }
  colorTitulos()
});

/* Cada vez que se cambie de modo light o dark, los titulos cambiaran de color tambien en caso de haber cambiado sus colores previamente, se realizo esto para evitar un par de errores en donde el texto quedaba en white en algunos casos no deseados */
const titulo = document.querySelectorAll(".titulo");// Obtener la lista de elementos con la clase "titulos"
function colorTitulos(){
  titulo.forEach(function(titulo) {   // Iterar sobre la lista de elementos
  var currentClass = document.body.classList.value;
  // Si el modo de la página es "light-mode"
  if (currentClass =="light-mode") {
    titulo.style.color = "black";
  } 
  else
    {titulo.style.color = "white"}
});

}



// Busca todos los elementos con la clase "dropdown-btn"
const dropdownButtons = document.querySelectorAll(".dropdown-btn");

// Agrega el evento a cada elemento encontrado
dropdownButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Prevenimos que el evento siga propagándose
    e.stopPropagation();
    // Obtenemos el elemento con clase "dropdown-content" más cercano al botón clicado
    const dropdownContent = button.closest(".dropdown").querySelector(".dropdown-content");
    // Se evalua, esta en block, cambia a none, sino, a block
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
});


// Agrega el evento al documento para cerrar el menú cuando se hace clic fuera de él
document.addEventListener("click", function (e) {
  // Verifica si el clic no ocurrió en el menú o en uno de sus descendientes
  if (!e.target.closest(".dropdown")) {
    // Si el clic fue fuera del menú, oculta el menú
    const dropdownContents = document.querySelectorAll(".dropdown-content");
    dropdownContents.forEach(function (dropdownContent) {
      dropdownContent.style.display = "none";
    });
  }
});








/* USADO PARA DESPLEGAR LAS RESPUESTAS A LAS PREGUNTAS */
const preguntas = document.querySelectorAll('.preguntas');

preguntas.forEach(pregunta => {
  pregunta.addEventListener('click', function() {
    const respuesta = this.nextElementSibling; //nextElementSibling es una propiedad de los elementos HTML que se refiere al siguiente hermano en el árbol DOM
    if (respuesta.style.display === 'block') {
      respuesta.style.display = 'none';
    } else {
      respuesta.style.display = 'block';
    }
  });
});


