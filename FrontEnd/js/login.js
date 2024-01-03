document.addEventListener("DOMContentLoaded", async() => {
    linklogin()
    stockToken()
});

function linklogin() {
  const formular = document.querySelector("form");
  formular.addEventListener("submit", async function (event) {
    console.log("POUET2")
    event.preventDefault();
    //creation de l'objet password
    const passwordLogin = {
    email: event.target.querySelector("input[name=email]").value,
    password: event.target.querySelector("input[name=password]").value,
    };
    console.log(passwordLogin);
  
    const combinaisonMailPass = JSON.stringify(passwordLogin);
  
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
      "accept": " application/json",
      "Content-Type": "application/json" 
      },
      body: combinaisonMailPass,
    });
        
    if (response.status === 200) {
      console.log(response);
    } else {
      console.log("la requête n'a pas abouti"); // “Erreur dans l’identifiant ou le mot de passe
    }

    const email = document.querySelector("input[name=email]").value
    let validEmail = new RegExp("[a-z]+\.+[a-z]+@+[a-z]+\.+[a-z]");
    let emailGood = validEmail.test(email);
    console.log(emailGood);
    if(emailGood) {
      console.log("c'est bon");
    } else {
      console.log("c'est pas bon");
    }
  });
};

function stockToken() {
  // Récupérer le token
  var monToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

  // Stocker le token dans le local storage
  localStorage.setItem("monToken", monToken);
}




