document.addEventListener("DOMContentLoaded", async() => {
    linklogin();
});

function linklogin() {
  const formular = document.querySelector("form");
  formular.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (checkEmail()) {
      const body = buildBody(event);
      const response = await postLogin(body);
      handleResponse(response);
    
    } else {
      displayError("le format de l'email n'est pas valide")
    }
  });

  function buildBody(event) {
    const formData = {
      email: event.target.querySelector("input[name=email]").value,
      password: event.target.querySelector("input[name=password]").value,
    };
    let body = JSON.stringify(formData);
    return body;
  }

  //recuperer id et token
  async function postLogin(body) {
    return await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "accept": " application/json",
        "Content-Type": "application/json" 
      },
      body: body
    });
  }

  async function handleResponse(response) {
    if (response.status === 200) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      window.location.replace("index.html");
    } else if (response.status === 404) {
      displayError("Utilisateur introuvable");
    } else {
      displayError("Erreur dans l'identifiant ou le mot de passe");
    }
  }
};

function checkEmail() {
  email = document.querySelector("input[name=email]").value;
  let validEmail = new RegExp("[a-z]+\\.+[a-z]+@+[a-z]+\\.+[a-z]+");
  return validEmail.test(email);
}

function displayError(message) {
  const div = document.createElement("div");
  div.id = "div-error-message";
  div.innerText = message
  const changeInputEmail = document.getElementById("email");
  changeInputEmail.insertAdjacentElement("afterend", div);
  changeInputEmail.addEventListener("click", function() {
    div.style.display = "none";
  });
}