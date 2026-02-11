datos = {
  drinks: [],
};

async function extraerDatos() {
  document.getElementById("tarjetas").innerHTML = "<p>Cargando bebidas...</p>";
  const letras = "abcdefghijklmnopqrstuvwxyz";

  for (let letra of letras) {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`,
    );
    const data = await response.json();

    if (data.drinks) {
      datos.drinks = datos.drinks.concat(data.drinks);
    }
  }
  console.log("Total de drinks: ", datos.drinks.length);
  mostrarDatos();
  mostrarChistes();
}

function mostrarDatos() {
  let tDrinks = document.getElementById("tarjetas");
  tDrinks.innerHTML = "";
  for (let i = 0; i < datos.drinks.length; i++) {
  const drink = datos.drinks[i]; // capturamos el objeto actual

  var tarjeta = document.createElement("div");
  var tragoNombre = document.createElement("h2");
  var tragoImagen = document.createElement("img");

  tragoNombre.innerHTML = drink.strDrink;
  tragoImagen.src = drink.strDrinkThumb;

  tragoImagen.addEventListener("click", function () {
    var nuevaVentana = document.createElement("div");
    nuevaVentana.style.position = "fixed";
    nuevaVentana.style.width = "100%";
    nuevaVentana.style.height = "100%";
    nuevaVentana.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    nuevaVentana.style.zIndex = "1000";

    nuevaVentana.innerHTML = `
      <div class="contenido">
      <h2>${drink.strDrink}</h2>
      <div class="acomodo-img">
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
      </div>
        <div class="acomodo-info">
        <div class="ingredientes">
          <p><strong>Ingredientes:</strong></p>
          <ul>
            ${[...Array(15)].map((_, index) => {
              const ingredient = drink[`strIngredient${index + 1}`];
              const measure = drink[`strMeasure${index + 1}`];
              return ingredient
                ? `<li>${measure ? measure : ""} ${ingredient}</li>`
                : "";
            }).join("")}
          </ul>
        </div>
        <div class="instrucciones">
          <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
        </div>
        </div>
        <div class="boton-cerrar">
          <button class="cerrar">Cerrar</button>
        </div>
      </div>
    `;
    document.body.appendChild(nuevaVentana);
    nuevaVentana.querySelector(".cerrar").addEventListener("click", function () {
      document.body.removeChild(nuevaVentana);
    });
  });

  tarjeta.appendChild(tragoNombre);
  tarjeta.appendChild(tragoImagen);
  tDrinks.appendChild(tarjeta);
  }
}
function mostrarChistes() {
  var chistesukis = {};
  let chistes = document.getElementById("chistes");
  fetch(
    "https://official-joke-api.appspot.com/random_joke?ref=freepublicapis.com",
  )
    .then((response) => response.json())
    .then((data) => {
      const chiste = document.createElement("p");
      chiste.textContent = data.setup + " - " + data.punchline;
      chistes.appendChild(chiste);
    });
}  