
datos = {
    drinks: [],
};

async function extraerDatos() {
    document.getElementById("tarjetas").innerHTML = "<p>Cargando drinks...</p>";
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
