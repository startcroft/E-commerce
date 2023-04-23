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
          <button class="addCar">Add <img class="addCarIcon" src="/images/cart-plus.svg" alt="Add to card"></button>
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

    document.addEventListener(`click`, (event) => {
        if(event.target.classList.contains("addFavorite") || event.target.classList.contains("addHeart")){
            const id = event.target.getAttribute("name");
            productList.forEach(element => {
                if(element.id = id){
                    axios({
                        method: `POST`,
                        url: ""
                    })
                }
            })



        }
    })
    

