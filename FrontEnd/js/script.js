document.addEventListener("DOMContentLoaded", async() => {
  const works = await getWorks();
  console.table(works);
  displayWorks(works);
 
  const categories = await getCategories();
  console.table(categories); 
  displayCategoryButtons(categories, works);

  recupToken();
  redirectToLogin();

  designModal();
  setupModal();
  displayWorksMiniatures(works);
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
}

function designModal() {
  const body = document.querySelector("body");

  // Créer la couche d'ombre
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3);";

  const firstDiv = document.createElement("div");
  firstDiv.id = "myModal"
  firstDiv.style =  "position: absolute; top: 0; left: 0; width: 100%; height: 100%;";

  const secondDiv = document.createElement("div");
  secondDiv.style = " position: absolute; top: 130%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 10px; width: 530px; height: 480px;"

  const span = document.createElement("span");
  span.id = "closeModalBtn";
  span.style = " position: absolute; top: 10px; right: 7px; font-size: 20px; cursor: pointer;"
  span.innerText = "x";

  const para = document.createElement("p");
  para.style = "font-family: Work Sans; font-size: 22px; text-align: center; margin-top: 30px;"
  para.innerText = "Galerie photo"

  const div = document.createElement("div");
  div.style = "padding: 10px 65px 35px 65px;"
  div.id = "tdiv"

  var ligne = document.createElement("hr");
  ligne.style = "width: 400px"

  secondDiv.appendChild(span);
  secondDiv.appendChild(para);
  secondDiv.appendChild(div);
  secondDiv.appendChild(ligne);
  firstDiv.appendChild(secondDiv);
  body.appendChild(overlay);

  body.appendChild(firstDiv);
}

function displayWorksMiniatures(worksList) {
  const modalMiniatures = document.getElementById("tdiv");
  modalMiniatures.innerHTML = "";

  worksList.forEach((work) => {
    const miniature = createMiniature(work);
    modalMiniatures.appendChild(miniature);
  });
}

function createMiniature(work) {
  const minImage = document.createElement("img");
  minImage.src = work.imageUrl;
  minImage.style = "width: 70px; height: 100px; margin: 20px 7px 0px 0px";

  // Retourner la miniature créée
  return minImage;
}

function setupModal() {
  var modal = document.getElementById("myModal");
  let openModalBtn = document.getElementById("bouton-modifier");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var overlay = document.getElementById("overlay");

  // Open the modal
  openModalBtn.onclick = function() {
    modal.style.display = "block";
    overlay.style.display = "block";
  };

  // Close the modal when the close button is clicked
  closeModalBtn.onclick = function() {
      modal.style.display = "none";
      overlay.style.display = "none";
  };

  // Close the modal when clicking outside of it
  window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
          overlay.style.display = "none";
      }
  };
}


