const URL_PRODUCTS = "http://localhost:3000/arrayProductos";
const cardsContainer = document.querySelector(".productContainer");
const getProducts = async(url) => {
    try {
     const { data } = await axios.get(url);
     return data;
    } catch (error) {
        alert("Error al consultar la API");
    }
}

const printProducts = (container, products) => {

    container.innerHTML = "";
    products.forEach((element) =>{
        container.innerHTML += `
        <div class="productCard">
        <img class="productImage" src="${element.image}"
          alt="${element.nombre}">
        <h3 class="productName">${element.nombre}</h3>
        <span class="productPrice">$ ${element.precio}</span>
        <div class="productButtons">
          <button name=${element.id} class="addCar">Add <img class="addCarIcon" name=${element.id} src="/images/cart-plus.svg" alt="Add to card"></button>
          <button name=${element.id} class="addFavorite"><img class="addHeart" name=${element.id} src="/images/heart.svg" alt="favorite"></button>
        </div>
      </div>    
    `
    })
}

    document.addEventListener("DOMContentLoaded", async() => {
        const productList =  await getProducts(URL_PRODUCTS);
        console.log(productList);
        printProducts(cardsContainer, productList);
     });

    document.addEventListener(`click`, async(event) => {
        if(event.target.classList.contains("addFavorite") || event.target.classList.contains("addHeart")){
            const id = event.target.getAttribute("name");
            const productList =  await getProducts(URL_PRODUCTS);
            const favoriteList = await getProducts("http://localhost:3000/arrayFavoritos");
            if(favoriteList.find(element => element.id == id)){
                alert("El producto ya está entre tus favoritos")
            } else{
                productList.forEach(element => {
                    if(element.id == id){

                        axios({
                            method: `POST`,
                            url: "http://localhost:3000/arrayFavoritos",
                            data: element
                        }).then(res => console.log(res.data));
                        alert("Se ha añadido a tus favoritos");
                    }
                })
            }
        }

        if(event.target.classList.contains("addCar") || event.target.classList.contains("addCarIcon")){
            const id = event.target.getAttribute("name");
            const productList =  await getProducts(URL_PRODUCTS);
            const carList = await getProducts("http://localhost:3000/arrayCar");
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

    export {getProducts};
    export {printProducts}
    


