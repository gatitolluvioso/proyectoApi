let datos = {
  drinks: [],
};

document.addEventListener("DOMContentLoaded", () => {
  extraerDatos();
});

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

  mostrarDatos();
  activarBuscador();
  mostrarChistes();
}

function mostrarDatos(lista = datos.drinks) {
  let tDrinks = document.getElementById("tarjetas");
  tDrinks.innerHTML = "";

  lista.forEach((drink) => {
    const tarjeta = crearTarjeta(drink);
    tDrinks.appendChild(tarjeta);
  });
}

function crearTarjeta(drink) {
  const tarjeta = document.createElement("div");
  const tragoNombre = document.createElement("h2");
  const tragoImagen = document.createElement("img");

  tragoNombre.textContent = drink.strDrink;
  tragoImagen.src = drink.strDrinkThumb;

  tarjeta.addEventListener("click", function () {
    const nuevaVentana = document.createElement("div");
    nuevaVentana.style.position = "fixed";
    nuevaVentana.style.width = "100%";
    nuevaVentana.style.height = "100%";
    nuevaVentana.style.backgroundColor = "rgba(0,0,0,0.8)";
    nuevaVentana.style.zIndex = "1000";

    nuevaVentana.innerHTML = `
      <div class="contenido">
        <h2>${drink.strDrink}</h2>

        <div class="acomodo-info">
          <div class="acomodo-img">
            <img src="${drink.strDrinkThumb}" />
          </div>

          <div class="info-bebida">
            <div class="ingredientes">
              <p><strong>Ingredientes:</strong></p>
              <ul>
                ${[...Array(15)]
                  .map((_, i) => {
                    const ing = drink[`strIngredient${i + 1}`];
                    const meas = drink[`strMeasure${i + 1}`];
                    return ing ? `<li>${meas ? meas : ""} ${ing}</li>` : "";
                  })
                  .join("")}
              </ul>
            </div>

            <div class="instrucciones">
              <p><strong>Instrucciones:</strong></p>
              <p>${drink.strInstructionsES}</p>
            </div>
          </div>
        </div>

        <button class="cerrar">Cerrar</button>
      </div>
    `;

    document.body.appendChild(nuevaVentana);

    nuevaVentana.querySelector(".cerrar").addEventListener("click", () => {
      document.body.removeChild(nuevaVentana);
    });
  });

  tarjeta.appendChild(tragoNombre);
  tarjeta.appendChild(tragoImagen);

  return tarjeta;
}

function activarBuscador() {
  const inputBuscador = document.getElementById("buscador");

  inputBuscador.addEventListener("input", function () {
    const texto = inputBuscador.value.toLowerCase();

    if (texto === "") {
      mostrarDatos();
      return;
    }

    const filtradas = datos.drinks.filter((drink) =>
      drink.strDrink.toLowerCase().includes(texto),
    );

    mostrarDatos(filtradas);
  });
}

function mostrarChistes() {
  let chistes = document.getElementById("chistes");

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) => {
      const chiste = document.createElement("p");
      chiste.textContent = data.setup + " - " + data.punchline;
      chistes.appendChild(chiste);
    });
}
