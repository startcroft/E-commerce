const URL_CAR = "http://localhost:3000/arrayCar"
const carContainer = document.querySelector(".productContainer");
const totalTag = document.querySelector(".totalTag");
const getCarProducts = async(url) => {
    try {
     const { data } = await axios.get(url);
     return data;
    } catch (error) {
        alert("Error al consultar la API");
    }
}

const printCarCards = (container, carList) => {
  container.innerHTML = "";
  carList.forEach((element) => {
    container.innerHTML += `
    <div class="productCard">
                    <img class="productImage"
                        src="${element.image}" alt="${element.nombre}">
                    <h3 class="productName">${element.nombre}</h3>
                    <div class="priceContainer">
                        <span>Price</span>
                        <span class="productPrice">$ ${element.precio}</span>
                    </div>

                    <button name=${element.id} class="lessQuantity"><img name=${element.id} class="lessIcon" src="/images/dash-circle.svg"
                            alt="Add to card"></button>

                       <span class="quantity">${element.quantity}</span>

                    <button name=${element.id} class="addQuantity"><img name=${element.id} class="plusIcon" src="/images/plus-circle.svg"
                            alt="favorite"></button>

                    <div class="totalContainer">
                        <span>Total</span>
                        <span class="totalBuy">${element.quantity * element.precio}</span>
                    </div>
                    <button name=${element.id} class="cancelProduct"><img name=${element.id} class="cancelIcon" src="../images/x-square.svg" alt="Quitar producto"></button>
                </div>
    `
  })
}

document.addEventListener("DOMContentLoaded", async() => {
    const carProducts = await getCarProducts(URL_CAR);
    printCarCards(carContainer, carProducts);
    const numero = await totalizarCompra();
    console.log(numero);
    totalTag.textContent = numero;
})

document.addEventListener(`click`, async(event) => {
    if(event.target.classList.contains("addQuantity") || event.target.classList.contains("plusIcon")){
        const id = event.target.getAttribute("name");
        const carProducts =  await getCarProducts(URL_CAR);

        carProducts.forEach((element) =>{
            if(element.id == id){
                let cantidad = element.quantity + 1;
                axios.put(`http://localhost:3000/arrayCar/${element.id}`, {
                    id: element.id,
                    nombre: element.nombre,
                    image: element.image,
                    precio: element.precio,
                    category: element.category,
                    quantity: cantidad
                })
                .then(res => console.log(res.data));
            }
        })
    }

    if(event.target.classList.contains("lessQuantity") || event.target.classList.contains("lessIcon")){
        const id = event.target.getAttribute("name");
        const carProducts =  await getCarProducts(URL_CAR);

        carProducts.forEach((element) =>{
            if(element.id == id){
                let cantidad = element.quantity - 1;
                axios.put(`http://localhost:3000/arrayCar/${element.id}`, {
                    id: element.id,
                    nombre: element.nombre,
                    image: element.image,
                    precio: element.precio,
                    category: element.category,
                    quantity: cantidad
                })
                .then(res => console.log(res.data));
            }
        })
    }

    if(event.target.classList.contains("cancelProduct") || event.target.classList.contains("cancelIcon")){
        const id = event.target.getAttribute("name");
        const carProducts =  await getCarProducts(URL_CAR);

        carProducts.forEach((element) =>{
            if(element.id == id){
                axios.delete(`http://localhost:3000/arrayCar/${element.id}`)
                .then(res => console.log(res.data));
                alert("Se ha eliminado del carrito");
            }
        })
    }
})

const totalizarCompra = async() => {
    const carProducts =  await getCarProducts(URL_CAR);
    let totalCompra = 0;
    carProducts.forEach((element) => {
      totalCompra = totalCompra + (element.quantity * element.precio);
    })
    return totalCompra
}

