let id = 0;
const createProduct = document.querySelector(".createProduct");
const nameProduct = document.querySelector(".nameProduct");
const productImage = document.querySelector(".productImage");
const priceProduct = document.querySelector(".priceProduct");
const categoryProduct = document.querySelector(".categoryProduct");
const idEdit = JSON.parse(sessionStorage.getItem(`idEdit`));
const titleForm = document.querySelector(".titleForm");

if (idEdit) {
    titleForm.textContent = "Editar Producto";
    validateAction(idEdit);
}

const getProducts = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        alert("Error al consultar la API");
    }
}

const validateAction = async (identification) => {
    const productList = getProducts("http://localhost:3000/arrayProductos");
    productList.forEach((product) =>{
        if(productList.id == identification){
            nameProduct.textContent = productList.nombre;
            productImage.textContent = productList.image;
            priceProduct.textContent = productList.precio;
            categoryProduct.textContent = productList.category;
        }
    })
}

createProduct.addEventListener(`click`, (e) => {
    e.preventDefault();

    const productList = getProducts("http://localhost:3000/arrayProductos");

    const nombre = nameProduct.value;
    const image = productImage.value;
    const precio = priceProduct.value;
    const category = categoryProduct.value;

    id = productList.length + 1;

    axios({
        method: `POST`,
        url: "http://localhost:3000/arrayProductos",
        data: {
            id,
            nombre,
            image,
            precio,
            category
        }
    }).then(res => console.log(res.data));
    alert("Se ha añadido a productos");



})