import userValidation from "../services/userAutentication.js";

const formUser = document.querySelector(".formLogin");

const validateInputs = () => {
  const formInfo = {};
  let emptyField = "";
  const nodeInputs = document.querySelectorAll("input");
  const nodeLabel = document.querySelectorAll("label");
  const inputs = Array.from(nodeInputs);
  const labels = Array.from(nodeLabel);

  inputs.forEach(element => {
    if (element.id) {
      formInfo[element.id] = element.value;
    }
  });
  console.log(formInfo);
  for (const key in formInfo) {
    if (!formInfo[key]) {
      const label = labels.find((element) => element.getAttribute("for") === key);
      const labelInnerText = label.innerText.substring(0, label.innerText.length);
      emptyField += `${labelInnerText}`;
    }
  }

  if (emptyField) {
    return {
      data: {},
      message: `Campos vacíos: ${emptyField}`
    }
  } else {
    return {
      data: formInfo,
      message: ""
    }
  }
}

const submitUser = async (form) => {
  const userLogin = validateInputs();
  if (userLogin.message) {
    alert("Los campos deben estar diligenciados")
  } else {
    const user = await userValidation(userLogin.data.userName, userLogin.data.password);
    if (user.length) {
      if (user[0].rol === "administrador") {
        alert("Has iniciado sesión"
        )

        sessionStorage.setItem("user", JSON.stringify(user[0]));
        window.location = "./admin.html";
      } else if (user[0].rol === "cliente") {
        alert("Has inciado sesión")
        sessionStorage.setItem("user", JSON.stringify(user[0]));
        window.location = "./index.html";
      }
    }
  }

}


formUser.addEventListener(`submit`, async (event) => {
  event.preventDefault();
  await submitUser(formUser);
})

