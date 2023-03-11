const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});
api.defaults.headers.common["X-API-KEY"] =
  "live_lnJ5100Ka9IMWEwq7XPkArya38HB2nMFWnHxrOg22HoUgX99BeY9sKsbARWdf4h7";

// const API_KEY = `api_key=live_lnJ5100Ka9IMWEwq7XPkArya38HB2nMFWnHxrOg22HoUgX99BeY9sKsbARWdf4h7`;
// const API_GatitoRamdom =
//   "https://api.thecatapi.com/v1/images/search?&" + API_KEY;
// const API_GatitoFav = "https://api.thecatapi.com/v1/favourites?&" + API_KEY;
// const API_GatitoDelete = (id) =>
//   `https://api.thecatapi.com/v1/favourites/${id}?&` + API_KEY;

const BtnAggFav = document.querySelector(".BtnAggFav");
const error = document.querySelector(".error");
const BtnVerOtroGatito = document.querySelector(".BtnVerOtroGatito");
BtnVerOtroGatito.addEventListener("click", imgGatitoRandom);

// Al precionar un boton carga otra imagen
async function imgGatitoRandom() {
  // const respuesta = await fetch(API_GatitoRamdom);
  // const data = await respuesta.json();

  const { data, status } = await api.get("/images/search");

  if (status != 200) {
    error.innerText =
      "Hubo un error, Intendelo de nuevo mas tarde. Error " +
      status +
      data.message;
  } else {
    const etiquetaImagen = document.querySelector("img");
    etiquetaImagen.src = data[0].url;
    // BtnAggFav.addEventListener("click", () => saveGatitoFav(data[0].id));
    BtnAggFav.onclick = () => saveGatitoFav(data[0].id);
    console.log(data);
  }
}

// Al precionar un boton agrego la imagen que ya estaba cargada a favoritos

async function imgGatitoFav() {
  // const respuesta = await fetch(API_GatitoFav);
  // const data = await respuesta.json();

  const { data, status } = await api.get("/favourites");
  if (status != 200) {
    error.innerText =
      "Hubo un error, Intendelo de nuevo mas tarde" + status + data.message;
  } else {
    const section = document.querySelector(".sectionFavotitoGatito");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Gatitos Favoritos 💖");
    h2.appendChild(h2Text);
    section.appendChild(h2);
    data.forEach((gatito) => {
      const section = document.querySelector(".sectionFavotitoGatito");
      const article = document.createElement("article");
      article.classList.add("imgAndButton");
      const img = document.createElement("img");
      img.classList.add("imgGatito");
      const button = document.createElement("button");
      button.classList.add("btnQuitarFav");
      const buttonText = document.createTextNode("💔");

      button.appendChild(buttonText);
      img.src = gatito.image.url;
      article.append(img,button);
      section.appendChild(article);

      button.addEventListener("click", () => deleteGatitoFav(gatito.id));
    });
  }
}

// se guarda el gatito a favoritos
async function saveGatitoFav(id) {
  // const respuesta = await fetch(API_GatitoFav, {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });
  // const data = await respuesta.json();

  const { data, status } = await api.post("/favourites", {
    image_id: id,
  });
  if (status != 200) {
    error.innerText =
      "Hubo un error, Intendelo de nuevo mas tarde" + status + data.message;
  } else {
    imgGatitoFav();
  }
}

async function deleteGatitoFav(id) {
  // const respuesta = await fetch(API_GatitoDelete(id), {
  //   method: "DELETE",
  // });

  const { data, status } = await api.delete(`/favourites/${id}`);

  if (status != 200) {
    error.innerText =
      "Hubo un error, Intendelo de nuevo mas tarde" + status + data.message;
  }
  

  imgGatitoFav();
}

imgGatitoRandom();
imgGatitoFav();
