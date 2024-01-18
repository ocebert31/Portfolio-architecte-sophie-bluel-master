function createModal(context) {
    closeModal();
    createOverlay();
    let panel = createPanel(context);
    closeModalButton(panel);
    createTitle(panel);
    createErrorMessageBox(panel);
    createContentBox(panel);
    createDivider(panel);
    createSubmitBUtton(panel);
    return panel;
  }
  
  function closeModal() {
    removeElementIfExist(getAnyPanel());
    removeElementIfExist(getOverlay());
  }
  
  function removeElementIfExist(element) {
    if(element) {
      element.remove();
    }
  }
  
  function getAnyPanel() {
    return document.getElementsByClassName("panel")[0];
  }
  
  function getOverlay() {
    return document.getElementById("overlay");
  }
  
  function createOverlay() {
    const body = document.querySelector("body");
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3);";
    body.appendChild(overlay);
    overlay.addEventListener("click", () => {
      closeModal();
    });
  }
  
  function createPanel(context) {
    const body = document.querySelector("body");
    const panel = document.createElement("div");
    panel.id = context;
    panel.classList.add("panel");
    panel.style = "position: absolute; top: 70%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 10px; width: 550px;";
    body.appendChild(panel);
    return panel;
  }
  
  function closeModalButton(panel) {
    const closeBtn = document.createElement("span");
    closeBtn.id = "closeModalBtn";
    closeBtn.style = "position: absolute; top: 20px; right: 20px; font-size: 25px; cursor: pointer;";
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", () => {
      closeModal();
    });
    panel.appendChild(closeBtn);
  }
  
  function createTitle(panel) {
    const title = document.createElement("p");
    title.style = "font-family: Work Sans; font-size: 26px; text-align: center; margin-top: 30px;";
    title.id = "modalTitle";
    panel.appendChild(title);
  }
  
  function createErrorMessageBox(panel) {
    const errorMessageBox = document.createElement("div");
    errorMessageBox.id = "errorMessage";
    errorMessageBox.style = "color: red; margin-top: 10px; text-align: center; font-size: 16px;";
    panel.appendChild(errorMessageBox);
  }
  
  function createContentBox(panel) {
    const contentBox = document.createElement("div");
    contentBox.id = "contentBox";
    panel.appendChild(contentBox);
  }
  
  function createDivider(panel) {
    const divider = document.createElement("hr");
    divider.style.borderTop = "1px solid #B3B3B3; width: 400px";
    panel.appendChild(divider)
  }
  
  function createSubmitBUtton(panel) {
    const submitButton = document.createElement("input")
    submitButton.type = "submit";
    submitButton.style = "display: flex; justify-content: center; height: 36px; font-size: 14px;"
    submitButton.id = "submitButton";
    panel.appendChild(submitButton);
  }
  
  
  
  
  
  
  
  
  
function displayDeleteWorkModal() {
  createModal("deleteWork");
  changeModalTitle("Galerie photo");
 submitButtonRedirectToCreateWork() 
 createContentBoxWorks();
}

function changeModalTitle(value) {
  title = document.getElementById("modalTitle");
  title.innerText = value;
}

function submitButtonRedirectToCreateWork() {
  const submitButton = document.getElementById("submitButton");
  submitButton.value = "Ajouter une photo"
  submitButton.addEventListener("click", () => {
    displayCreateWorkModal();
  });
}

function createContentBoxWorks() {
  const contentBox = document.getElementById("contentBox");
  contentBox.style = "display: flex; flex-wrap: wrap; padding: 20px 0px 20px 30px";
  getWorks().forEach((work) => {
      const miniature = createMiniatureForWork(work);
      contentBox.appendChild(miniature);
  });
}



function createMiniatureForWork(work) {
 

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.style = "position: absolute; top: 25px; right: 13px; background-color: black; color: white; padding: 5px; cursor: pointer; font-size: 10px; width: 22px; height: 22px;";
    
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", async () => {
      const isDeleted = await deleteWork(work.id);
      if (isDeleted) {
        miniature.remove();
        document.getElementById(`work-${work.id}`).remove();
      } else {
        console.error(`Échec de la suppression du travail avec l'ID ${work.id}.`);
      }
    });

    miniature.appendChild(image);
    miniature.appendChild(deleteButton);
    return miniature;
}

function createContainerAndMiniatureImage() {
   const miniature = document.createElement("div"); 
  miniature.style = "position: relative;";
 
  const image = document.createElement("img");
  image.src = work.imageUrl;
  image.style = "width: 90px; height: 120px; margin: 20px 7px 0px 0px; object-fit: cover;";
}
























































  
  async function deleteWork(workId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajout du token d'authentification
      },
    });
    return response.status === 204;
  }
  
  
  
  
  
  
  
  
  function displayCreateWorkModal() {
    const panel = createModal("createWork");

    changeModalTitle("Ajouter photo");
    const submitButton = document.getElementById("submitButton");
    submitButton.value = "Valider";
    submitButton.addEventListener("click", () => {
      submitWork();
    });
  
    let iconArrow = document.createElement("i");
    iconArrow.id = 'iconArrow';
    iconArrow.classList.add("fa-solid", "fa-arrow-left");
    iconArrow.addEventListener("click", () => {
      displayDeleteWorkModal();
    });
    title.insertAdjacentElement("beforebegin", iconArrow);
  
    const contentBox = document.getElementById("contentBox");

    let fileContainer = document.createElement("div");
    fileContainer.id = "form";
    fileContainer.style = "display: flex; flex-direction: column; align-items: center; border-radius: 3px; background-color: #E8F1F6; margin: 25px 45px 15px 45px;";
  
    let fileSelection = document.createElement("div");
    fileSelection.id = "form";
    fileSelection.style = "width: 300px; display: flex;overflow: hidden; flex-direction: column; align-items: center;"
    fileContainer.appendChild(fileSelection);
  
    // creation icon
    let iconPicture = document.createElement("i");
    iconPicture.id = "icon";
    iconPicture.classList.add("fa-regular", "fa-image");
    iconPicture.style = "color: #B9C5CC; font-size: 70px; margin: 20px;";
    fileSelection.appendChild(iconPicture);
  
    // Créez un nouvel élément input de type "file"
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = ".jpg, .png";
    imageInput.id = "imageInput";
    imageInput.style.display = "none"; // Masquer le champ de fichier
    imageInput.addEventListener("change", handleImageChange);
  
    // Créez un bouton personnalisé
    const addImageButton = document.createElement("button");
    addImageButton.innerText = "+ Ajouter Photo";
    addImageButton.id = "addImageButton";
    addImageButton.style = "border-radius: 50px; background-color: #CBD6DC; color: #306685; font-size: 14px; font-weight: 500; width: 173px; height: 36px; cursor: pointer; border-width: 0px;";
  
    // Associez le clic sur le bouton personnalisé à un clic sur le champ de fichier
    addImageButton.addEventListener("click", () => {
      imageInput.click();
      // Créez un nouvel élément img pour l'aperçu de l'image
      const previewImage = document.createElement("img");
      previewImage.id = "previewImage";
      previewImage.style = "width: 100%; height: 100%; object-fit: cover;";
      fileSelection.appendChild(previewImage);
    });

    const inputFileLabel = document.createElement("p")
    inputFileLabel.innerText = "jpg, png : 4mo max";
    inputFileLabel.id = "inputFileLabel";
    inputFileLabel.style = "font-size: 10px; color: #444444; padding: 5px 0px 15px 0px;";

    fileSelection.appendChild(imageInput);
    fileSelection.appendChild(addImageButton);
    fileSelection.appendChild(inputFileLabel);

    let formContainer = document.createElement("div");
    formContainer.style = "display: flex; flex-direction: column; border-radius: 3px; margin: 15px 45px 15px 45px;";
    formContainer.id = "divLabel";
  
    let titleLabel = document.createElement("label");
    titleLabel.innerText = "Titre";
    titleLabel.classList.add("label");
  
    let titleInput = document.createElement("input");
    titleInput.id = "titleInput";
    titleInput.type = "text";
    titleInput.style = "width: 412px; height: 45px; background-color: #FFFFFF; box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.09); border-width: 0px; margin: 10px;";
  
    let categoryLabel = document.createElement("label");
    categoryLabel.innerText = "Catégorie";
    categoryLabel.classList.add("label");

    let categorySelect = document.createElement("select");
    categorySelect.id = "categorySelect";
    categorySelect.style = "width: 420px; height: 51px; background-color: #FFFFFF; box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.09); border-width: 0px; margin: 10px 10px 40px 10px;";
    getCategories().forEach(category => {
      const option = document.createElement("option");
      option.value =category.id;
      option.text = category.name;
      categorySelect.appendChild(option);
    });
  
    formContainer.appendChild(titleLabel);
    formContainer.appendChild(titleInput);
    formContainer.appendChild(categoryLabel);
    formContainer.appendChild(categorySelect);
  
    // Ajoutez les éléments au DOM
    contentBox.appendChild(fileContainer);
    contentBox.appendChild(formContainer);
  }
  
  function handleImageChange(event) {
    // Récupère le champ de fichier et l'élément d'aperçu de l'image
    console.log(event);
    const imageInput = event.target;
    const previewImage = document.getElementById("previewImage");
    // TODO
    // previewImage.id = `image-${image.id}`;
  
    // Vérifie si un fichier a été sélectionné
    if (imageInput.files && imageInput.files[0]) {
      // Crée un objet FileReader
      const reader = new FileReader();
  
      // Fonction de rappel pour mettre à jour l'aperçu de l'image
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
  
      // Lit le fichier en tant que Data URL (base64)
      reader.readAsDataURL(imageInput.files[0]);
  
      // Masque l'icône, le bouton d'ajout de photo et l'élément avec l'ID "info"
      document.getElementById("icon").style.display = "none";
      document.getElementById("addImageButton").style.display = "none";
      document.getElementById("inputFileLabel").style.display = "none";
    }
  }

  async function submitWork() {
    // Récupérer les valeurs du formulaire
    const errorMessageBox = document.getElementById("errorMessage");
    const title = document.getElementById("titleInput").value;
    const category = document.getElementById("categorySelect").value;
    const image = document.getElementById('imageInput').files[0];
   
    if (!image) {
      errorMessageBox.innerText = "Veuillez ajouter l'image.";
      return;
    }

    if (!title) {
      errorMessageBox.innerText = "Veuillez ajouter le titre.";
      return;
    }

    if (!category) {
      errorMessageBox.innerText = "Veuillez indiquer la catégorie.";
      return;
    }

    if (!title || !category|| !image) {
      errorMessageBox.innerText = "Veuillez saisir tous les champs.";
      return;
    }

    const formData  = new FormData();
    formData.append('title', title);
    formData.append('category', category)
    formData.append('image', image)
  
    // Envoyer une requête POST au backend
    const response = await fetch("http://localhost:5678/api/works", {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    if (response.status === 201) {
      const works = await getWorksFromAPI();
      displayWorks(works);
      closeModal();
    } else {
      errorMessageBox.innerText = "Erreur lors de l'enregistrement de votre image.";
    }
  }