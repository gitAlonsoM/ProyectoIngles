/* Accediendo al index.html y cargando la funcion que accedera a la api */
document.addEventListener('DOMContentLoaded', ()=>{ /* el evento "Domcontendloaded carga cuado la info esta totalmente cargada (la info de json)*/
    fetchData() /* cargara la funcion flecha fetchdata */
})


let data;

const fetchData = async () => {
  try {
    const res = await fetch('verbosGerundio.json');
    data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
}


const contenedorPalabras = document.querySelector(".contenedorPalabras")
const seccion1 = document.querySelector(".seccion1")



let idiomaActual = "español"; // Asignamos el idioma actual


//boton para cambiar el idioma
let botonCambiarIdioma = document.createElement("button");
botonCambiarIdioma.textContent = "Español";
botonCambiarIdioma.id= "botonCambiarIdioma-id"
seccion1.appendChild(botonCambiarIdioma);


botonCambiarIdioma.addEventListener("click", ()=> {
    // Cambia el valor de idiomaActual a "español" o "ingles" según corresponda
    
    if (idiomaActual === "ingles") {
      idiomaActual = "español";
      botonCambiarIdioma.textContent = "Español";
    } else {
      idiomaActual = "ingles";
      botonCambiarIdioma.textContent = "Inglés";
    }
    // Borra todos los elementos actuales del contenedorPalabras
    contenedorPalabras.textContent = "";
    // Vuelve a llamar a la función pintarCards con los datos actualizados
    pintarCards(data, idiomaActual);
});



/* Usado para activar o desactivar el audio desde el usuario */
let audioEnabled = false; //Variable global que indica si el audio está habilitado o no
const toggleAudioButton = document.getElementById("toggle-audio-button"); 

toggleAudioButton.addEventListener("click", () => {
  const audio= document.getElementById("audio")
  audioEnabled = !audioEnabled; // Invertira el valor de la variable booleana al ocurrir el evento click
  if (audioEnabled) {
    audio.textContent = "volume_up";
  } else {
    audio.textContent = "volume_off";
  }
});


let englishVoice = null; //necesario declarla globalmente vacia para que luego se le asigne un valor con la voz encontrada

//Función para buscar una voz en inglés en el dispositivo
window.speechSynthesis.onvoiceschanged = () => {
  const voices = window.speechSynthesis.getVoices();
  englishVoice = voices.find(voice => voice.lang === 'en-US');
};


//Función para reproducir el audio en inglés, el llamado a la funcion se realiza al hacer click en alguna palabra, desde la funcion pintarCard
function speak(text) {
  if ('speechSynthesis' in window) { //si es viable usar speechSynthesis
      if (audioEnabled) { //en caso que el audio este activado desde el usuario
        const locutor = new SpeechSynthesisUtterance();
        locutor.text = text;
        locutor.voice = englishVoice;
        //locutor.voice.lang = 'en-US'; //forzar audio en en-US
        locutor.rate = 0.65; //velocidad audio
        locutor.pitch = 1.1; //tono de voz
        window.speechSynthesis.speak(locutor);
      } else {
        console.log("El audio no esta habilitado");
      }
  } else { //en caso que el dispositivo no pueda usar speechSynthesis
    console.log("El navegador no soporta speechSynthesis");
  }
}




/* Creacion de fragment para evitar reflow del for, todas las palabras se agregaran al fragment y luego el fragmente se agregara al "contenedorPalabras"*/
const fragmentX = document.createDocumentFragment()

//Función principal para pintar todas las palabras desde json en "contenedorPalabras" de html
pintarCards = (data, idiomaActual) => { 
  for (let i = 0; i < data.length; i++) {

    let palabra = document.createElement("div");

    if (idiomaActual === "ingles") { 
      palabra.textContent = data[i].español.join(", "); 
      palabra.id = "español-id"
    } else { //como idiomaActual es en "español", se activara solo el else y se pintaran las palabras en ingles
      palabra.textContent = data[i].ingles;  
      palabra.id = "ingles-id"  
    }
    palabra.classList.add("palabra");


    //Evento click para cambiar el idioma y reproducir el audio
    palabra.addEventListener("click", (e) => {
      palabra.classList.toggle("click");
      if (palabra.textContent === data[i].ingles) {
        palabra.textContent = data[i].español.join(", ");
      } else {
        palabra.textContent = data[i].ingles;
      }
      speak(data[i].ingles); //llamado a la funcion para generar el audio en la palabra concreta a la que se clickea
    });

    fragmentX.appendChild(palabra);  //se agregan las palabras en el fragment
  }
  contenedorPalabras.appendChild(fragmentX); //finalmente se agrega el fragment a contenedor palabras
};



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
  document.getElementById("myBtn").style.display = "none"; //cuando se despliega el menu, el btn para subir desaparece
});



/* DARK MODE */
document.getElementById('dark-mode-button').addEventListener('click', function() {
  // Obtener la clase actual del elemento body
  dark = document.querySelector("#darkIcon"); // se le cambiara el icono de dark a light unicamente cambiando el texto
  var currentClass = document.body.classList.value;

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

 function topFunction() { 
  window.scrollTo({
    top: 0,
    behavior: 'smooth'/* usada unicamente para que el desplazamiento hacia la parte superior sea mas suave */
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




//Recorrer el .json y mostrar en consola nombres repetidos.
fetch('verbosGerundio.json')
  .then((response) => response.json())
  .then((data) => {
    const nombresEnIngles = new Set();
    const nombresRepetidos = [];

    data.forEach((element) => {
      if (nombresEnIngles.has(element.ingles)) {
        nombresRepetidos.push(element.ingles);
      } else {
        nombresEnIngles.add(element.ingles);
      }
    });

    if (nombresRepetidos.length > 0) {
      console.log("Nombres en inglés repetidos:");
      console.log(nombresRepetidos);
    } else {
      console.log("No hay nombres en inglés repetidos.");
    }
  })
  .catch((error) => console.error(error));

