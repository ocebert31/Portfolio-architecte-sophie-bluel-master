document.addEventListener("DOMContentLoaded", async() => {
  const works = await getWorks();
  console.table(works);
  displayWorks(works);
 
  const categories = await getCategories();
  console.table(categories); 
  displayCategoryButtons(categories, works);

  linklogin()
});

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

function displayWorks(worksList) {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""

    worksList.forEach((work) => {
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    const figure = document.createElement("figure");

    image.src = work.imageUrl;
    image.alt = work.title;
    figcaption.innerText = work.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

function displayCategoryButtons(categoryList, workList) {
  const div = divButton();
  
  createButton("Tous", null);
  categoryList.forEach((category) => {
    createButton(category.name, category.id);
  });
  
  function divButton() {
    const introductionTitle = document.querySelector("#portfolio h2");
    const div = document.createElement("div");
    introductionTitle.insertAdjacentElement("afterend", div);
    div.style = "text-align: center; margin-bottom: 40px;";
    return div;
  }

  function createButton(name, categoryId) {
    const button = document.createElement("button");
    button.innerHTML = name;
    button.classList = "filter";
    div.appendChild(button);
    button.style = "margin-right: 13px; font-size: 17px; border-radius: 30px; border-color: #1D6154; color: #1D6154; background-color: white; font-weight: bold; padding: 6px 25px 6px 25px; border: 1px solid #1D6154; font-family: 'Work Sans';"

    button.addEventListener("click", () => {
      const workFilter = workList.filter((work) => {
        return work.category.id === categoryId || categoryId === null;
      })
      displayWorks(workFilter);
      document.querySelectorAll(".filter").forEach(button => {
        button.style.backgroundColor = "white";
        button.style.color = "#1D6154";
      });
        button.style.backgroundColor = "#1D6154"; 
        button.style.color = "white";
    });
  }
}

function linklogin() {
  const listItems = document.querySelectorAll('li');
  const thirdListItem = listItems[2];
  thirdListItem.setAttribute('id', 'login');
  const loginButton = document.getElementById('login');

  loginButton.addEventListener('click', () => {
    const header = document.querySelector("header");
    header.style.visibility = "visible";

    const main = document.querySelector("main");
    main.style.display = "none";

    const login = document.createElement("div");
    main.insertAdjacentElement("afterend", login);

    const footer = document.querySelector("footer");
    footer.style.visibility = "visible";

    const alignement = "display: grid; justify-content: center;";

    const formular = document.createElement("form");
    formular.setAttribute("onsubmit", "return false");
    formular.style = alignement;
    login.appendChild(formular);

    const legend = document.createElement("legend");
    legend.innerText = "Log In";
    legend.style = "font-size: 30px; color: #1D6154; font-family: Syne; text-align: center;"
    formular.appendChild(legend);

    const allInputStyle = "display: block; width: 379px; height: 51px; background: rgba(255, 255, 255, 1); box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.09); border-width: 0px;";
    const dispositionLabel = "display: block; margin-top: 25px; margin-bottom: 10px;"

    const labelMail = document.createElement("label");
    labelMail.textContent = "E-mail";
    labelMail.style = dispositionLabel + "font-size: 14px;";
    formular.appendChild(labelMail);

    const inputMail = document.createElement("input");
    inputMail.type = "text";
    inputMail.name = "email";
    inputMail.style = allInputStyle
    formular.appendChild(inputMail);
    
    const labelPassword = document.createElement("label");
    labelPassword.textContent = "Mot de passe";
    labelPassword.style = dispositionLabel;
    formular.appendChild(labelPassword);

    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.name = "password";
    inputPassword.style = allInputStyle;
    formular.appendChild(inputPassword); 

    const boutonSeConnecter = document.createElement("input");
    boutonSeConnecter.value = "Se connecter";
    boutonSeConnecter.type = "submit";
    boutonSeConnecter.style = alignement + "height: 36px;"
    formular.appendChild(boutonSeConnecter);

    const passwordforget = document.createElement("p");
    passwordforget.innerText = "Mot de passe oublié"
    passwordforget.style = alignement + "font-size: 14px; text-decoration-line: underline;"
    login.appendChild(passwordforget);

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
  });
} 



