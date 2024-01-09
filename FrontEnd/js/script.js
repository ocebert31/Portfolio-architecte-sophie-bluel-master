document.addEventListener("DOMContentLoaded", async() => {
  const works = await getWorks();
  console.table(works);
  displayWorks(works);
 
  const categories = await getCategories();
  console.table(categories); 
  displayCategoryButtons(categories, works);

  recupToken();
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

function recupToken() {
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem("token");

  // Vérifier si le token existe
  if (token) {
      console.log("Token récupéré:", token);
      changeLoginButtonText("logout");
      hideFilters();
      addModifyButton()
      
       // TODO : a mettre dans le onclick du bouton modifier good
      // TODO : a retirer good
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
   // Ajoutez un gestionnaire d'événements au bouton de connexion
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

function addModifyButton() {
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

  // TODO : add event listener on click for designModal function good
  modifyButton.addEventListener("click", () => {
    createUpdateModal();
     //???
  })
}

function createUpdateModal(works) {
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
  closeBtn.style = "position: absolute; top: 10px; right: 7px; font-size: 20px; cursor: pointer;";
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

  displayWorksMiniatures(works);
}

  function displayWorksMiniatures(worksList) {
  const modalMiniatures = document.getElementById("tdiv");
  modalMiniatures.style = "display: flex; flex-wrap: wrap; padding: 20px;";
  modalMiniatures.innerHTML = "";

  worksList.forEach((work) => {
    const miniature = createMiniature(work);
    modalMiniatures.appendChild(miniature);
  });
}

function createMiniature(work) {
  const container = document.createElement("div"); // Conteneur pour l'image, le bouton, etc.
  container.style = "position: relative;"; // Positionnement relatif pour positionner le bouton

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
    // Vous pouvez appeler une fonction pour supprimer le travail, par exemple.
    console.log(`Clic sur le bouton de suppression pour le travail avec l'ID ${work.id}`);
  });

  imageContainer.appendChild(minImage);
  container.appendChild(imageContainer);
  imageContainer.appendChild(deleteButton); // Ajouter le bouton de suppression au conteneur principal

  // Positionner le bouton de suppression en haut à droite
  deleteButton.style = "position: absolute; top: 25px; right: 13px; background-color: black; color: white; padding: 5px; cursor: pointer; font-size: 10px; width: 22px; height: 22px;";

  // Retourner le conteneur créé
  return container;
}

