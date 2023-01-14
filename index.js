
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






/* Lo siguiente es usado para cambiar el valor de los titulos entre ingles y español */
const titles = ["titulo1", "titulo2", "titulo3", "titulo4", "titulo5", "titulo6"]; 

for (let i = 0; i < titles.length; i++){ // se iteraran estos valores para referenciar los id de forma rapida con el for
  const title = document.getElementById(titles[i]);
  title.addEventListener("click", function(){ //cada titulo tendra su propio evento click
    cambiarIdioma(titles[i]);
  });
} 
// Función para cambiar entre el texto en inglés y español
function cambiarIdioma(id) {
  // Obtiene el elemento con el id especificado
  const titleElement = document.getElementById(id);
  // Obtiene el texto actual del elemento
  const currentText = titleElement.textContent;
  // Asigna el texto en el idioma opuesto al actual
  const newText = (currentText === oraciones[id]["english"]) ? oraciones[id]["spanish"] : oraciones[id]["english"];
  // Establece el nuevo texto en el elemento
  titleElement.textContent = newText;

  // Obtiene el elemento del body
  const bodyElement = document.querySelector("body");
  // Si el modo de la página es "light-mode" y el texto actual es en inglés
  if (bodyElement.classList.contains("light-mode") && currentText === oraciones[id]["english"]) {
    // Cambia el color del texto a negro
    titleElement.style.color = "blue";
  }
  if (bodyElement.classList.contains("light-mode") && currentText === oraciones[id]["spanish"]) {
    // Cambia el color del texto a negro
    titleElement.style.color = "black";
  }
  // Si el modo de la página es "dark-mode" y el texto actual es en inglés
  if (bodyElement.classList.contains("dark-mode") && currentText === oraciones[id]["english"]) {
    // Cambia el color del texto a blanco
    titleElement.style.color = "blue";
  } 
  // Si el modo de la página es "dark-mode" y el texto actual es en inglés
  if (bodyElement.classList.contains("dark-mode") && currentText === oraciones[id]["spanish"]) {
    // Cambia el color del texto a blanco
    titleElement.style.color = "white";
  } 
}
// Objeto con las frases en inglés y español
const oraciones = {
  "titulo1": {
    "english": "The musician plays a strange song on the piano under the stars during the summer.",
    "spanish": "El músico toca una canción extraña en el piano bajo las estrellas durante el verano."
  },
  "titulo2": {
    "english": "The scientist conducts experiments in the laboratory with sophisticated equipment.",
    "spanish": "El científico realiza experimentos en el laboratorio con equipo sofisticado."
  },
  "titulo3": {
    "english": "The child paints a colorful picture of a beautiful landscape.",
    "spanish": "El niño pinta una imagen colorida de un hermoso paisaje."
  },
  "titulo4": {
    "english": "The chef prepares a delicious meal with fresh ingredients.",
    "spanish": "El chef prepara una deliciosa comida con ingredientes frescos."
  },
  "titulo5": {
    "english": "She sings a beautiful song about love and happiness.",
    "spanish": "Ella canta una hermosa canción sobre el amor y la felicidad."
  },
  "titulo6": {
    "english": "The cat gracefully plays with a colorful toy.",
    "spanish": "El gato juega graciosamente con un juguete colorido."
  }
};







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



/* MENU DESPLEGABLE VERBOS CAMBIANDO UN DISPLAY DE NONE A BLOCK */
document.querySelector(".dropdown-btn").addEventListener("click", function(e) {
  // Prevenimos que el evento siga propagándose
  e.stopPropagation();
  // Obtenemos el elemento con clase "dropdown-content"
  var dropdownContent = document.querySelector(".dropdown-content");
  // Se evalua, esta en block, cambia a none, sino, a block
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
});

/* AL HACER CLICK FUERA DEL MENU, ESTE SE CIERRA */
document.querySelector("body").addEventListener("click", function(e) {
  // Si el elemento clicado no es el mismo que el elemento "dropdown-btn" ni un descendiente del mismo
  if (!e.target.closest(".dropdown-btn")) {
    // Ocultamos el menú desplegable
    document.querySelector(".dropdown-content").style.display = "none";
  }
});



