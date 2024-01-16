document.addEventListener("DOMContentLoaded", async() => {
  const works = await getWorks();
  console.table(works);
  displayWorks(works);
 
  const categories = await getCategories();
  console.table(categories); 
  displayCategoryButtons(categories, works);

  recupToken(works);
  redirectToLogin();    
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
    image.style = "height: 100%; object-fit: cover;"
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

function recupToken(worksList) {
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem("token");

  // Vérifier si le token existe
  if (token) {
      console.log("Token récupéré:", token);
      changeLoginButtonText("logout");
      editionHeadband();
      hideFilters();
      addModifyButton(worksList)
  } else {
      console.log("Aucun token trouvé dans le localStorage.");
      changeLoginButtonText("login");
  }
}

function changeLoginButtonText(newText) {
  const loginButton = document.getElementById("login");
  if (loginButton) {
    loginButton.innerText = newText;
  }
}

function editionHeadband() {
  const headband = document.createElement("div");
  headband.style = "background-color: black; height: 50px;"
  const header = document.querySelector("header");
  header.insertAdjacentElement("beforebegin", headband);

  const editionIcon = document.createElement("i");
  editionIcon.classList.add("fa-regular", "fa-pen-to-square")
  editionIcon.style = "padding-right: 5px;"

  const divEditionText = document.createElement("div");
  divEditionText.innerText = "Mode Edition";
  divEditionText.style = "color: white; text-align: center; padding-top: 15px; font-size: 16px;";

  divEditionText.insertBefore(editionIcon, divEditionText.firstChild);
  headband.appendChild(divEditionText);
}

// Fonction qui permet de cacher les boutons catégories
function hideFilters() {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach(button => {
      button.style.display = "none";
  }); 
}

// Fonction qui permet d'ajouter le bouton modifier
function addModifyButton(worksList) {
  const projectsTitle = document.querySelector("#portfolio h2");
  const modifyButton = document.createElement("button");
  modifyButton.id = "bouton-modifier";
  const icon = document.createElement("i");

  icon.classList.add("fa-regular", "fa-pen-to-square");
  icon.style = "width: 15.6px; height: 15.6px; margin-right: 8px;"

  modifyButton.innerText = "modifier";
  modifyButton.style = "font-size: 14px; background-color: white; border-width: 0px; margin-left: 15px;"

  modifyButton.insertBefore(icon, modifyButton.firstChild);
  projectsTitle.appendChild(modifyButton);

  modifyButton.addEventListener("click", () => {
      createUpdateModal(worksList);
  })
}

function redirectToLogin() {
   // Ajout d'un gestionnaire d'événements au bouton de connexion
  const loginButton = document.getElementById("login");
  if (loginButton) {
    loginButton.addEventListener("click", handleLoginClick);
  }
}

// Fonction pour gérer le clic sur le bouton de connexion
function handleLoginClick() {
    const token = localStorage.getItem("token");
  
    if (token) {
      // Si un token existe, le supprimer
      localStorage.removeItem("token");
      window.location.href = "index.html";
    } else {
      // Si aucun token n'existe, rediriger vers la page de connexion
      window.location.href = "login.html";
    }
  }
  