document.addEventListener("DOMContentLoaded", async() => {
    linklogin()
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
      });
  };