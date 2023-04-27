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
          <button name=${element.id} class="editProduct"><img class="editIcon" name=${element.id} src="/images/pencil.svg" alt="edit product"></button>
          <button name=${element.id} class="deleteProduct"><img class="deleteIcon" name=${element.id} src="/images/trash3-fill.svg" alt="favorite"></button>
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

 document.addEventListener(`click`, async (event) => {

    if (event.target.classList.contains("deleteProduct") || event.target.classList.contains("deleteIcon")) {
        const id = event.target.getAttribute("name");
        const productList = await getProducts("http://localhost:3000/arrayProductos");

        productList.forEach((element) => {
            if (element.id == id) {
                axios.delete(`http://localhost:3000/arrayProductos/${element.id}`)
                .then(res => console.log(res.data));
                alert("Se ha eliminado de productos");
            }
        })
    }

    if (event.target.classList.contains("editProduct") || event.target.classList.contains("editIcon")) {
        const id = event.target.getAttribute("name");
        sessionStorage.setItem("idEdit", JSON.stringify(id));
        window.location.href = "/pages/createProduct.html"
    }

})