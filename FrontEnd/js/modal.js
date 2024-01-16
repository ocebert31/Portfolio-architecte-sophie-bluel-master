// Fonction qui crée la modale 
function createUpdateModal(worksList) {
    const body = document.querySelector("body");

    // Créer la couche d'ombre
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3);";
    body.appendChild(overlay);

    // Créer la fenêtre modale
    const modal = document.createElement("div");
    modal.id = "myModal";
    modal.style = "position: absolute; top: 70%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 10px; width: 550px;";
    body.appendChild(modal);

    displayErrorMessage();
    displayTitleModal();  
    displayMinWorks();
    displayHorizontalLine()
    buttonClose();
    createInputAjoutPictures(worksList);
}

// Fonction qui affiche un message d erreur si le formulaire n'est pas correctement rempli
function displayErrorMessage() {
    const errorMessageContainer = document.createElement("div");
    errorMessageContainer.id = "errorMessage";
    errorMessageContainer.style = "color: red; margin-top: 10px; text-align: center; font-size: 16px;";
    let modal = document.getElementById("myModal");
    modal.appendChild(errorMessageContainer);
    setTimeout(() => {
        errorMessageContainer.innerText = "";
    }, 5000);
}

// Fonction qui affiche le titre de la modale 
function displayTitleModal() {
    const title = document.createElement("p");
    title.style = "font-family: Work Sans; font-size: 26px; text-align: center; margin-top: 30px;";
    title.innerText = "Galerie photo";
    title.id = "title";
    let modal = document.getElementById("myModal");
    modal.appendChild(title);
}

// Fonction qui affiche les travaux en miniature
function displayMinWorks() {
    const worksmin = document.createElement("div");
    worksmin.id = "tdiv";
    let modal = document.getElementById("myModal");
    modal.appendChild(worksmin);
}

// Fonction qui affiche la ligne horizontale
function displayHorizontalLine() {
    const horizontalLine = document.createElement("hr");
    horizontalLine.style.borderTop = "1px solid #B3B3B3; width: 400px";
    let modal = document.getElementById("myModal");
    modal.appendChild(horizontalLine)
}

// Fonction qui crée le bouton fermeture
function buttonClose() {
    const closeBtn = document.createElement("span");
    closeBtn.id = "closeModalBtn";
    closeBtn.style = "position: absolute; top: 20px; right: 20px; font-size: 25px; cursor: pointer;";
    closeBtn.innerText = "x";
    let modal = document.getElementById("myModal");
    let overlay = document.getElementById("overlay");
    closeBtn.addEventListener("click", () => {
        modal.remove();
        overlay.remove();
    });
    modal.appendChild(closeBtn);
    // Ajout d'un écouteur d'événements pour fermer la modal lorsque vous cliquez n'importe où sur le document
    document.addEventListener("click", (event) => {
        if (event.target === overlay) {
        modal.remove();
        overlay.remove();
        }
    });
}

// Fonction qui crée le bouton ajouter une photo
function createInputAjoutPictures(worksList) {
    const inputAjout = document.createElement("input")
    inputAjout.type = "submit";
    inputAjout.value = "Ajouter une photo"
    inputAjout.style = "display: flex; justify-content: center; height: 36px; font-size: 14px;"
    inputAjout.id = "inputAjout";
    let modal = document.getElementById("myModal");
    modal.appendChild(inputAjout);
    inputAjout.addEventListener("click", () => {
    handleOtherModal();
    displayCrossArrow(worksList);
})
    displayWorksMiniatures(worksList);
}

// Fontion qui affiche les travaux en petit 
function displayWorksMiniatures(worksList) {
    const modalMiniatures = document.getElementById("tdiv");
    modalMiniatures.style = "display: flex; flex-wrap: wrap; padding: 20px 0px 20px 30px";

    worksList.forEach((work) => {
        const miniature = createMiniature(work);
        modalMiniatures.appendChild(miniature);
    });
}


function createMiniature(work) {
    // Conteneur pour l'image, le bouton.
    const container = document.createElement("div"); 
    container.style = "position: relative;"; 
  
    // Conteneur pour l'image
    const imageContainer = document.createElement("div"); 
    const minImage = document.createElement("img");
    minImage.id = "minImage";

    imageContainer.appendChild(minImage);
    container.appendChild(imageContainer);
    imageContainer.appendChild(createDeleteButton(container));
  
    // let minImage = document.getElementById("minImage");
    minImage.src = work.imageUrl;
    minImage.style = "width: 90px; height: 120px; margin: 20px 7px 0px 0px; object-fit: cover;";
    
    // Retourner le conteneur créé
    return container;
  }
  
function createDeleteButton(container) {
  const deleteButton = document.createElement("button");
  deleteButton.style = "position: absolute; top: 25px; right: 13px; background-color: black; color: white; padding: 5px; cursor: pointer; font-size: 10px; width: 22px; height: 22px;";
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", async () => {
    // Utiliser la fonction pour supprimer un travail
    const isDeleted = await deleteWork(work.id);
    if (isDeleted) {
      container.remove();
    } else {
      console.error(`Échec de la suppression du travail avec l'ID ${work.id}.`);
    }
  });
  return deleteButton;
}





































  
  let arrowExists = false; // Ajoutez une variable pour suivre l'existence de la flèche
  
  function goBackToPreviousModal() {
    // Supprimez la modal actuelle
    const modal = document.getElementById("myModal");
    const overlay = document.getElementById("overlay");
    modal.remove();
    overlay.remove();
  
    // Réinitialisez la variable modalExists
    modalExists = false;
  }
  

  

  

  
  async function deleteWork(workId) {
    const token = localStorage.getItem("token");
  
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajoutez le token d'authentification
      },
    });
  
    if (response.status === 200) {
      return true; // La suppression a réussi
    } else {
      return false;
    }
  }
  
  let modalExists = false;
  
  function handleOtherModal() {
    // Vérifiez si la modal existe déjà
    if (modalExists) {
      return true;
    }
  
    // Modifier le titre de la modal
    let title = document.getElementById("title");
    title.innerText = "Ajout photo";
  
    createAjoutPicture();
    createText();
    createInputTitleCategories();
  
    // Modifier le texte du bouton pour refléter l'action de validation
    let inputAjout = document.getElementById("inputAjout");
    inputAjout.value = "Valider";
    inputAjout.addEventListener("click", () => {
      // Appeler la fonction pour envoyer le nouveau projet au backend
      sendNewProject();
      handleImageChange();
      displayCrossArrow();
    });
  
    function sendNewProject() {
      // Récupérer les valeurs du formulaire
      const title = document.querySelector("#divLabel input[type='text']").value;
      const category = document.querySelector("#container select").value;
      const image = document.getElementById('inputImage').files[0];
      
      if (!image) {
        let error = document.getElementById("errorMessage");
        error.innerText = "Veuillez ajouter l'image.";
        return;
      }
  
      if (!title) {
        let error = document.getElementById("errorMessage");
        error.innerText = "Veuillez ajouter le titre.";
        return;
      }
  
      if (!category) {
        let error = document.getElementById("errorMessage");
        error.innerText = "Veuillez indiquer la catégorie.";
        return;
      }
  
      if (!title || !category|| !image) {
        let error = document.getElementById("errorMessage");
        error.innerText = "Veuillez saisir tous les champs.";
        return;
      }
  
      const formData  = new FormData();
      console.log(title)
      console.log(category)
      console.log(image)
      formData.append('title', title);
      formData.append('category', category)
      formData.append('image', image)
      // Créer un objet représentant le nouveau projet
      const newProject = {
        title: title,
        category: category,
        // Ajoutez d'autres propriétés si nécessaire
      };
    
      // Envoyer une requête POST au backend
      fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          // Traitez la réponse du serveur si nécessaire
          console.log("Nouveau projet ajouté :");
          console.log(JSON.stringify(data));
          let success = document.getElementById("successMessage");
          success.innerText = "Le formulaire a été correctement envoyé.";
          return;
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout du projet:', error);
          // Gérez l'erreur si nécessaire
        });
    }
    // Supprimer la div qui contient les miniatures des travaux (s'il y en a une)
    let divMinWorks = document.getElementById("tdiv");
    if (divMinWorks) {
      divMinWorks.remove();
    }
    // Marquez la modal comme existante
    modalExists = true;
  }
  
  function displayCrossArrow(worksList) {
    // Vérifiez si la flèche existe déjà
    if (arrowExists) {
      return;
    }
  
    let titleModal = document.getElementById("title");
    let iconArrow = document.createElement("i");
    iconArrow.classList.add("fa-solid", "fa-arrow-left");
    iconArrow.addEventListener("click", () => {
      createUpdateModal(worksList);
      handleOtherModal();
    });
    titleModal.insertAdjacentElement("beforebegin", iconArrow);
  
    // Marquez la flèche comme existante
    arrowExists = true;
  }
  
  
  function createText() {
    let textData = document.createElement("p")
    textData.innerText = "jpg, png : 4mo max"
    textData.id = "info";
    textData.style = "font-size: 10px; color: #444444; padding: 5px 0px 15px 0px;"
  
    let divPicturesUsers = document.getElementById("divPictureUsers");
    divPicturesUsers.appendChild(textData);
  }
  
  function createAjoutPicture() {
    // Créer une nouvelle div pour tous
    let divForAll = document.createElement("div");
    divForAll.style = "display: flex; flex-direction: column; align-items: center; border-radius: 3px; background-color: #E8F1F6; margin: 25px 45px 15px 45px;";
    divForAll.id = "divForAll";
  
    // créer une nouvelle div pour Image de l utilisateur
    let divPictureUsers = document.createElement("div");
    divPictureUsers.id = "divPictureUsers";
    divPictureUsers.style = "width: 300px; display: flex;overflow: hidden; flex-direction: column; align-items: center;"
  
    // Insérer la nouvelle div après le titre
    let title = document.getElementById("title");
    title.insertAdjacentElement("afterend", divForAll);
  
    // creation icon
    let iconPicture = document.createElement("i");
    iconPicture.id = "icon";
    iconPicture.classList.add("fa-regular", "fa-image");
    iconPicture.style = "color: #B9C5CC; font-size: 70px; margin: 20px;";
    divPictureUsers.appendChild(iconPicture);
  
    // Créez un nouvel élément input de type "file"
    const inputImage = document.createElement("input");
    inputImage.type = "file";
    inputImage.accept = ".jpg, .png";
    inputImage.id = "inputImage";
    inputImage.style.display = "none"; // Masquer le champ de fichier
  
    // Ajoutez un gestionnaire d'événements pour le changement de l'élément input
    inputImage.addEventListener("change", handleImageChange);
  
    // Créez un bouton personnalisé
    const customButton = document.createElement("button");
    customButton.innerText = "+ Ajouter Photo";
    customButton.id = "boutonAjouterPhoto";
    customButton.style = "border-radius: 50px; background-color: #CBD6DC; color: #306685; font-size: 14px; font-weight: 500; width: 173px; height: 36px; cursor: pointer; border-width: 0px;";
  
    // Associez le clic sur le bouton personnalisé à un clic sur le champ de fichier
    customButton.addEventListener("click", () => {
        inputImage.click();
      // Créez un nouvel élément img pour l'aperçu de l'image
      const previewImage = document.createElement("img");
      previewImage.id = "previewImage";
      previewImage.style = "width: 100%; height: 100%; object-fit: cover;";
      divPictureUsers.appendChild(previewImage);
    });
  
    // Ajoutez les éléments au DOM
    divForAll.appendChild(divPictureUsers);
    divPictureUsers.appendChild(inputImage);
    divPictureUsers.appendChild(customButton);
  }
  
  
  
  function createInputTitleCategories() {
    let divLabel = document.createElement("div");
    divLabel.style = "display: flex; flex-direction: column; border-radius: 3px; margin: 15px 45px 15px 45px;"
    divLabel.id = "divLabel";
  
    let labelTitle = document.createElement("label");
    labelTitle.innerText = "Titre";
    labelTitle.classList.add("label");
  
    let inputTitle = document.createElement("input");
    inputTitle.id = "inputTitle";
    inputTitle.type = "text";
    inputTitle.style = "width: 412px; height: 45px; background-color: #FFFFFF; box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.09); border-width: 0px; margin: 10px;";
  
    let labelCategorie = document.createElement("label");
    labelCategorie.innerText = "Categorie";
    labelCategorie.classList.add("label");
  
    divLabel.appendChild(labelTitle);
    divLabel.appendChild(inputTitle);
    divLabel.appendChild(labelCategorie);
    
    // Créer un élément de liste déroulante
    let selectList = document.createElement("select");
    selectList.id = "selectList";
    selectList.style = "width: 420px; height: 51px; background-color: #FFFFFF; box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.09); border-width: 0px; margin: 10px 10px 40px 10px;";
    let options = ["Objets", "Appartements", "Hôtels & restaurants"];
  
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.value = i + 1;
        option.text = options[i];
        selectList.appendChild(option);
    }
  
    // Créer le conteneur "container" avant de l'utiliser
    let container = document.createElement("div");
    container.id = "container";
  
    // Ajouter la liste déroulante à la fin du conteneur "container"
    container.appendChild(selectList);
  
    // Ajouter le conteneur à la fin de divLabel
    divLabel.appendChild(container);
  
    let divForAll = document.getElementById("divForAll");
    divForAll.insertAdjacentElement("afterend", divLabel);
  
    styleLabelInput();
  }
  
  function handleImageChange(event) {
    // Récupère le champ de fichier et l'élément d'aperçu de l'image
    console.log(event);
     
    const previewImage = document.getElementById("previewImage");
  
    // Vérifie si un fichier a été sélectionné
    if (inputImage.files && inputImage.files[0]) {
      // Crée un objet FileReader
      const reader = new FileReader();
  
      // Fonction de rappel pour mettre à jour l'aperçu de l'image
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
  
      // Lit le fichier en tant que Data URL (base64)
      reader.readAsDataURL(inputImage.files[0]);
  
      // Masque l'icône, le bouton d'ajout de photo et l'élément avec l'ID "info"
      document.getElementById("icon").style.display = "none";
      document.getElementById("boutonAjouterPhoto").style.display = "none";
      document.getElementById("info").style.display = "none";
    }
  }
  
  function styleLabelInput() {
    let labels = document.querySelectorAll(".label");
    labels.forEach(label => {
      label.style = "font-weight: 500; font-size: 14px; color: #3D3D3D; margin: 5px;";
    });
  }