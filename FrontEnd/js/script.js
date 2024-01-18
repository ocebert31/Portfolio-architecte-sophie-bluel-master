document.addEventListener("DOMContentLoaded", async() => {
  const works = await getWorksFromAPI();
  console.table(works);
  displayWorks(works);
 
  const categories = await getCategoriesFromAPI();
  console.table(categories); 
  displayCategoryButtons();

  checkAuthentication()
  redirectToLogin();    
});

let works = [];

async function getWorksFromAPI() {
  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  return works;
}

function getWorks() {
  return works;
}

let categories = [];

async function getCategoriesFromAPI() {
  const response = await fetch("http://localhost:5678/api/categories");
  categories = await response.json();
  return categories;
}

function getCategories() {
  return categories;
}

function displayWorks(workList) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  workList.forEach((work) => {
    const image = document.createElement("img");
    image.style = "height: 100%; object-fit: cover;";
    const figcaption = document.createElement("figcaption");
    const figure = document.createElement("figure");
    figure.id = `work-${work.id}`;

    image.src = work.imageUrl;
    image.alt = work.title;
    figcaption.innerText = work.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

function displayCategoryButtons() {
  const div = divButton();
  
  createButton("Tous", null);
  getCategories().forEach((category) => {
    createButton(category.name, category.id);
  });
  
  divButton();

  function createButton(name, categoryId) {
    const button = document.createElement("button");
    button.innerHTML = name;
    button.classList = "filter";
    div.appendChild(button);

    button.addEventListener("click", () => {
      const workFilter = getWorks().filter((work) => {
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

function divButton() {
  const introductionTitle = document.querySelector("#portfolio h2");
  const div = document.createElement("div");
  introductionTitle.insertAdjacentElement("afterend", div);
  div.style = "text-align: center; margin-bottom: 40px;";
  return div;
}

function checkAuthentication() {
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem("token");

  // Vérifier si le token existe
  if (token) {
    console.log("Token récupéré:", token);
    changeLoginButtonText("logout");
    editionHeadband();
    hideFilters();
    addModifyButton();
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
  let headband = createHeadband();
  locationHeadband(headband);
  let textHeadband = createTextHeadband();
  let editionIcon = createEditionIcon();
  textHeadband.insertBefore(editionIcon, textHeadband.firstChild);
  headband.appendChild(textHeadband);
}

function createHeadband() {
  const headband = document.createElement("div");
  headband.style = "background-color: black; height: 50px;";
  return headband;
}

function locationHeadband(headband) {
  const header = document.querySelector("header");
  header.insertAdjacentElement("beforebegin", headband);
}

function createTextHeadband() {
  const divEditionText = document.createElement("div");
  divEditionText.innerText = "Mode Edition";
  divEditionText.id = "div-edition-text";
  return divEditionText;
}

function createEditionIcon() {
  const editionIcon = document.createElement("i");
  editionIcon.classList.add("fa-regular", "fa-pen-to-square")
  editionIcon.style = "padding-right: 5px;"
  return editionIcon;
}

function hideFilters() {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach(button => {
      button.style.display = "none";
  }); 
}

function addModifyButton() {
  const projectsTitle = document.querySelector("#portfolio h2");

  let modifyButton = createModifyButton();
  let modifyIcon = createModifyIcon ();

  modifyButton.insertBefore(modifyIcon, modifyButton.firstChild);
  projectsTitle.appendChild(modifyButton);
}

function createModifyButton () {
  const modifyButton = document.createElement("button");
  modifyButton.innerText = "modifier";
  modifyButton.id = "modify-button";
  modifyButton.addEventListener("click", () => {
    displayDeleteWorkModal();
  })
  return modifyButton;
}

function createModifyIcon() {
  const icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-pen-to-square");
  icon.id = "icon-modify";
  return icon;
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
  
