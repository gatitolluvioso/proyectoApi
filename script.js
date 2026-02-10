datos = {};

function extraerDatos() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
    .then((response) => response.json())
    .then((data) => {
      datos = data;
      console.log(datos);
      mostrarDatos();
    });
}

function mostrarDatos() {
  let tDrinks = document.getElementById("tarjetas");
  for (let i = 0; i < datos.drinks.length; i++) {
    var tarjeta = document.createElement("div");
    var tragoNombre = document.createElement("h2");
    var tragoImagen = document.createElement("img");

    tragoNombre.innerHTML = datos.drinks[i].strDrink;
    tragoImagen.src = datos.drinks[i].strDrinkThumb;

    tarjeta.appendChild(tragoNombre);
    tarjeta.appendChild(tragoImagen);
    tDrinks.appendChild(tarjeta);
  }
}
