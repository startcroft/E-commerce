// import { getProducts } from "./script.js"
import { printProducts } from "./script.js"
const favoriteContainer = document.querySelector(".productsSection");
const URL_FAVORITES = "http://localhost:3000/arrayFavoritos"


const getFavorites = async(url) => {
    try {
     const { data } = await axios.get(url);
     return data;
    } catch (error) {
        alert("Error al consultar la API");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const productList = await getFavorites(URL_FAVORITES);
    console.log(productList);
    printProducts(favoriteContainer, productList);
});

document.addEventListener(`click`, async(event) => {
    if(event.target.classList.contains("addFavorite") || event.target.classList.contains("addHeart")){
        const id = event.target.getAttribute("name");
        const productList =  await getFavorites(URL_FAVORITES);

            productList.forEach(element => {
                if(element.id == id){

                    axios.delete(`http://localhost:3000/arrayFavoritos/${element.id}`)
                    .then(res => console.log(res.data));
                    alert("Se ha eliminado de tus favoritos");
                }
            })
        
    }

    if(event.target.classList.contains("addCar") || event.target.classList.contains("addCarIcon")){
        const id = event.target.getAttribute("name");
        const productList =  await getFavorites(URL_FAVORITES);
        const carList = await getFavorites("http://localhost:3000/arrayCar");
        if(carList.find(element => element.id == id)){
            alert("El producto ya está en el carrito")
        } else{
            productList.forEach(element => {
                if(element.id == id){

                    axios({
                        method: `POST`,
                        url: "http://localhost:3000/arrayCar",
                        data: element
                    }).then(res => console.log(res.data));

                }
            })
        }
    }
})