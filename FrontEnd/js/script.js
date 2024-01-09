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

function hideFilters() {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach(button => {
    button.style.display = "none";
  }); 
}

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

function createUpdateModal(worksList) {
  const body = document.querySelector("body");

  // Créer la couche d'ombre
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3);";

  // Créer la fenêtre modale
  const modal = document.createElement("div");
  modal.id = "myModal";
  modal.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 10px; width: 550px;";

  // Créer le bouton de fermeture
  const closeBtn = document.createElement("span");
  closeBtn.id = "closeModalBtn";
  closeBtn.style = "position: absolute; top: 20px; right: 20px; font-size: 25px; cursor: pointer;";
  closeBtn.innerText = "x";
  closeBtn.addEventListener("click", () => {
    modal.remove();
    overlay.remove();
  });
  
  // Ajouter un écouteur d'événements pour fermer la modal lorsque vous cliquez n'importe où sur le document
  document.addEventListener("click", (event) => {
    if (event.target === overlay) {
      modal.remove();
      overlay.remove();
    }
  });

  // Créer le titre de la modal
  const title = document.createElement("p");
  title.style = "font-family: Work Sans; font-size: 22px; text-align: center; margin-top: 30px;";
  title.innerText = "Galerie photo";

  // Ajouter les éléments à la fenêtre modale
  modal.appendChild(closeBtn);
  modal.appendChild(title); 
  
  // Créer la div pour les travaux miniatures
  const worksmin = document.createElement("div");
  worksmin.id = "tdiv";
  modal.appendChild(worksmin);

  // Ajouter la fenêtre modale à la page
  body.appendChild(overlay);
  body.appendChild(modal);

  // Créez un nouvel élément div pour représenter le trait
  const horizontalLine = document.createElement("hr");
  horizontalLine.style.borderTop = "1px solid #B3B3B3; width: 400px"; // Changez la couleur et l'épaisseur selon vos besoins
  modal.appendChild(horizontalLine)

  // creer un bouton ajouter une photo
  const buttonAjout = document.createElement("button")
  buttonAjout.type = "submit";
  buttonAjout

  modal.appendChild(buttonAjout);

  displayWorksMiniatures(worksList);
}

function displayWorksMiniatures(worksList) {
  const modalMiniatures = document.getElementById("tdiv");
  modalMiniatures.style = "display: flex; flex-wrap: wrap; padding: 20px 0px 20px 30px";


  worksList.forEach((work) => {
    const miniature = createMiniature(work);
    modalMiniatures.appendChild(miniature);
  });
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

function createMiniature(work) {
  const container = document.createElement("div"); // Conteneur pour l'image, le bouton, etc.
  container.style = "position: relative;"; 

  const imageContainer = document.createElement("div"); // Conteneur pour l'image
  const minImage = document.createElement("img");
  const deleteButton = document.createElement("button"); // Bouton de suppression

  minImage.src = work.imageUrl;
  minImage.style = "width: 90px; height: 120px; margin: 20px 7px 0px 0px";

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => {
    // Gérer le clic sur le bouton de suppression
    console.log(`Clic sur le bouton de suppression pour le travail avec l'ID ${work.id}`);
  });

  imageContainer.appendChild(minImage);
  container.appendChild(imageContainer);
  imageContainer.appendChild(deleteButton); 

  // Positionner le bouton de suppression en haut à droite
  deleteButton.style = "position: absolute; top: 25px; right: 13px; background-color: black; color: white; padding: 5px; cursor: pointer; font-size: 10px; width: 22px; height: 22px;";

  // Retourner le conteneur créé
  return container;
}