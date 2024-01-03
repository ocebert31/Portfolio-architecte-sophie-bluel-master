document.addEventListener("DOMContentLoaded", async() => {
    linklogin()
    stockToken()
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

  function handleResponse(response) {
    if (response.status === 200) {
      console.log(response);
      changeLoginButtonText("Log out")
      history.back();
      // const butcat = document.querySelector('filter')
      // butcat.style.display = "none";
    } else if (response.status === 404) {
      displayError("Utilisateur introuvable");
      console.log(response);
    } else {
      displayError("Erreur dans l'identifiant ou le mot de passe");
      console.log(response);
    }
  }
};

function stockToken() {
  // Récupérer le token
  var monToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

  // Stocker le token dans le local storage
  localStorage.setItem("monToken", monToken);
}

function checkEmail() {
  email = document.querySelector("input[name=email]").value;
  let validEmail = new RegExp("[a-z]+\\.+[a-z]+@+[a-z]+\\.+[a-z]+");
  return validEmail.test(email);
}

function displayError(message) {
  const div = document.createElement("div");
  div.style = "color: red;";
  div.innerText = message
  const changeInputEmail = document.getElementById("email");
  changeInputEmail.insertAdjacentElement("afterend", div);
  changeInputEmail.addEventListener("click", function() {
    div.style.display = "none";
  });
}

 function changeLoginButtonText(newText) {
  const loginButton = document.getElementById("login");
  if (loginButton) {
    loginButton.innerText = newText;
  }
}
