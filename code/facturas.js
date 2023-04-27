const billContainer = document.querySelector(".billSection");


const getBill = async(url) => {
    try {
     const { data } = await axios.get(url);
     return data;
    } catch (error) {
        alert("Error al consultar la API");
    }
}

const printBills = (container, bills) => {
    container.innerHTML = "";
    bills.forEach((element) => {
        container.innerHTML += `
        <div class="billCard">
         <div class="dataSection">
          <h3>${element.nameInput}</h3>
          <span>Dirección: ${element.adressInput}</span>
          <span>Número: ${element.phoneInput}</span>
          <h4>total: ${element.totalPurcharsing}</h4>
         </div>
        </div>
        `
    })
}

document.addEventListener("DOMContentLoaded", async() => {
  const arrayBills = await getBill("http://localhost:3000/arrayCompras");
  printBills(billContainer, arrayBills);
})