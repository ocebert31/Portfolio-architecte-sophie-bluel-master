// Fonction qui gère les deux types de modales
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
  body.appendChild(panel);
  return panel;
}

function closeModalButton(panel) {
  const closeBtn = document.createElement("span");
  closeBtn.id = "closeModalBtn";
  closeBtn.innerText = "x";
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
  panel.appendChild(closeBtn);
}

function createTitle(panel) {
  const title = document.createElement("p");
  title.id = "modalTitle";
  panel.appendChild(title);
}

function createErrorMessageBox(panel) {
  const errorMessageBox = document.createElement("div");
  errorMessageBox.id = "errorMessage";
  panel.appendChild(errorMessageBox);
}

function createContentBox(panel) {
  const contentBox = document.createElement("div");
  contentBox.id = "contentBox";
  panel.appendChild(contentBox);
}

function createDivider(panel) {
  const divider = document.createElement("hr");
  divider.id = "divider";
  panel.appendChild(divider)
}

function createSubmitBUtton(panel) {
  const submitButton = document.createElement("input")
  submitButton.type = "submit";
  submitButton.id = "submitButton";
  panel.appendChild(submitButton);
}

// Fonction qui crée la première sorte de modale permettant de supprimer des travaux
function displayDeleteWorkModal() {
  createModal("deleteWork");
  changeModalTitle("Galerie photo");
  submitButtonRedirectToCreateWork();
  createContentBoxWorks();
}

function changeModalTitle(value) {
  title = document.getElementById("modalTitle");
  title.innerText = value;
}

function submitButtonRedirectToCreateWork() {
  const submitButton = document.getElementById("submitButton");
  submitButton.value = "Ajouter une photo";
  submitButton.addEventListener("click", () => {
    displayCreateWorkModal();
  });
}

function createContentBoxWorks() {
  const contentBox = document.getElementById("contentBox");
  contentBox.id = "content-box-works";
  getWorks().forEach((work) => {
      const miniature = createMiniatureForWork(work);
      contentBox.appendChild(miniature);
  });
}

function createMiniatureForWork(work) {
  let divMiniature = createContainerMiniature();
  let imageMiniature = createImageMiniature(work);
  let deleteButton = createDeleteButton();
  createDeleteIcon(work, deleteButton, divMiniature);
 
  divMiniature.appendChild(imageMiniature);
  divMiniature.appendChild(deleteButton);
  return divMiniature;
}

function createContainerMiniature() {
  const miniature = document.createElement("div"); 
  miniature.style = "position: relative;";
  return miniature;
}

function createImageMiniature(work) {
  const image = document.createElement("img");
  image.src = work.imageUrl;
  image.id = "image-miniature";
  return image;
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = "delete-button";
  return deleteButton;
}

function createDeleteIcon(work, deleteButton, divMiniature) {
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", async () => {
    const isDeleted = await deleteWork(work.id);
    if (isDeleted) {
      divMiniature.remove();
      document.getElementById(`work-${work.id}`).remove();
    } else {
      console.error(`Échec de la suppression du travail avec l'ID ${work.id}.`);
    }
  });
  return deleteIcon;
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
  
// Fonction qui crée la deuxième sorte de modale permettant d'ajouter des travaux
function displayCreateWorkModal() {
  const panel = createModal("createWork");

  changeModalTitle("Ajouter photo");
  submitButtonToCreateWork();
  createIconArrow();
  const fileContainer = createBigFileContainer();
  const fileSelection = createFileSelection(fileContainer);
  createIcon(fileSelection);
  const imageInput = createImageInput(fileSelection);
  createAddImageButton(imageInput, fileSelection);
  createInputFileLabel(fileSelection);
  const formContainer = createFormContainer();
  createTitleLabel(formContainer);
  createTitleInput(formContainer);
  createCategoryLabel(formContainer);
  createCategorySelect(formContainer);

  // Ajoutez les éléments au DOM
  const contentBox = document.getElementById("contentBox");
  contentBox.appendChild(fileContainer);
  contentBox.appendChild(formContainer);
}

function submitButtonToCreateWork() {
  const submitButton = document.getElementById("submitButton");
  submitButton.value = "Valider";
  submitButton.addEventListener("click", () => {
    submitWork();
  });
}

function createIconArrow() {
  let iconArrow = document.createElement("i");
  iconArrow.id = 'iconArrow';
  iconArrow.classList.add("fa-solid", "fa-arrow-left");
  iconArrow.addEventListener("click", () => {
    displayDeleteWorkModal();
  });
  title.insertAdjacentElement("beforebegin", iconArrow);
}

function createBigFileContainer() {
  let fileContainer = document.createElement("div");
  fileContainer.id = "form";
  fileContainer.classList = "file-container";
  return fileContainer;
}

function createFileSelection(fileContainer) {
  let fileSelection = document.createElement("div");
  fileSelection.id = "form";
  fileSelection.classList = "file-selection";
  fileContainer.appendChild(fileSelection);
  return fileSelection;
}

function createIcon(fileSelection) {
  let iconPicture = document.createElement("i");
  iconPicture.id = "icon";
  iconPicture.classList.add("fa-regular", "fa-image");
  fileSelection.appendChild(iconPicture);
  return iconPicture;
}

function createImageInput(fileSelection) {
  // Créez un nouvel élément input de type "file"
  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.accept = ".jpg, .png";
  imageInput.id = "imageInput";
  imageInput.style.display = "none"; // Masquer le champ de fichier
  imageInput.addEventListener("change", handleImageChange);
  fileSelection.appendChild(imageInput);
  return imageInput;
}

function createAddImageButton(imageInput, fileSelection) {
  const addImageButton = document.createElement("button");
  addImageButton.innerText = "+ Ajouter Photo";
  addImageButton.id = "addImageButton";
  addImageButton.addEventListener("click", () => {
    imageInput.click();
    // Création d'un nouvel élément img pour l'aperçu de l'image
    const previewImage = document.createElement("img");
    previewImage.id = "previewImage";
    fileSelection.appendChild(previewImage);
  });
  fileSelection.appendChild(addImageButton);
  return addImageButton;
}

function createInputFileLabel(fileSelection) {
  const inputFileLabel = document.createElement("p")
  inputFileLabel.innerText = "jpg, png : 4mo max";
  inputFileLabel.id = "inputFileLabel";
  fileSelection.appendChild(inputFileLabel);
  return inputFileLabel;
}

function createFormContainer() {
  let formContainer = document.createElement("div");
  formContainer.id = "divLabel";
  return formContainer;
}

function createTitleLabel(formContainer) {
  let titleLabel = document.createElement("label");
  titleLabel.innerText = "Titre";
  titleLabel.classList.add("label");
  formContainer.appendChild(titleLabel);
  return titleLabel;
}

function createTitleInput(formContainer) {
  let titleInput = document.createElement("input");
  titleInput.id = "titleInput";
  titleInput.type = "text";
  formContainer.appendChild(titleInput);
  return titleInput;
}

function createCategoryLabel(formContainer) {
  let categoryLabel = document.createElement("label");
  categoryLabel.innerText = "Catégorie";
  categoryLabel.classList.add("label");
  formContainer.appendChild(categoryLabel);
  return categoryLabel;
}

function createCategorySelect(formContainer) {
  let categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect";
  getCategories().forEach(category => {
    const option = document.createElement("option");
    option.value =category.id;
    option.text = category.name;
    categorySelect.appendChild(option);
  });
  formContainer.appendChild(categorySelect);
  return categorySelect;
}
  
function handleImageChange(event) {
  // Récupère le champ de fichier et l'élément d'aperçu de l'image
  const imageInput = event.target;
  const previewImage = document.getElementById("previewImage");

  // Vérifie si un fichier a été sélectionné
  if (imageInput.files && imageInput.files[0]) {
    // Crée un objet FileReader
    const reader = new FileReader();

    // Fonction de rappel pour mettre à jour l'aperçu de l'image
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };

    // Lit le fichier en tant que Data URL
    reader.readAsDataURL(imageInput.files[0]);

    hideElementOfForm();
  }
}

function hideElementOfForm() {
  document.getElementById("icon").style.display = "none";
  document.getElementById("addImageButton").style.display = "none";
  document.getElementById("inputFileLabel").style.display = "none";
}

function submitWork() {
  // Récupérer les valeurs du formulaire
  const errorMessageBox = document.getElementById("errorMessage");
  const title = document.getElementById("titleInput").value;
  const category = document.getElementById("categorySelect").value;
  const image = document.getElementById('imageInput').files[0];

  if(validateForm(image, title, category, errorMessageBox)) {
    const formData = buildForm(title, category, image)
    postRequest(formData, errorMessageBox);
  }
}

function validateForm(image, title, category, errorMessageBox) {
  if (!image) {
    errorMessageBox.innerText = "Veuillez ajouter l'image.";
    return false;
  }

  if (!title) {
    errorMessageBox.innerText = "Veuillez ajouter le titre.";
    return false;
  }

  if (!category) {
    errorMessageBox.innerText = "Veuillez indiquer la catégorie.";
    return false;
  }

  if (!title || !category|| !image) {
    errorMessageBox.innerText = "Veuillez saisir tous les champs.";
    return false;
  }
  return true;
}

function buildForm(title, category, image) {
  // formData est comme une hashmap { title: 'the_title', category: 1, image: file object }
  // On utilise un formData pour envoyer un fichier car, avec un fichier, le body est trop large pour être strigify
  const formData  = new FormData();
  formData.append('title', title);
  formData.append('category', category)
  formData.append('image', image)
  return formData
}

async function postRequest(formData, errorMessageBox) {
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
    createMessageSuccessBox();
  } else {
    errorMessageBox.innerText = "Erreur lors de l'enregistrement de votre image.";
  }
}

function createMessageSuccessBox() {
  let panelOfSuccessMessage = createPanelOfSuccessMessage();
  let successMessage = createSuccessMessage(panelOfSuccessMessage);
  timeDisplaySucessMessage(successMessage) 
  
  const gallery = document.querySelector(".gallery");
  gallery.insertAdjacentElement("beforebegin", successMessage);
}

function createPanelOfSuccessMessage() {
  const panelOfSuccessMessage = document.createElement("div");
  panelOfSuccessMessage.id = "panelOfSuccessMessage";
  return panelOfSuccessMessage;
}

function createSuccessMessage(panelOfSuccessMessage) {
  const successMessage  = document.createElement("p");
  successMessage.id = "successMessage";
  successMessage.innerText = "Le formulaire a été correctement rempli, votre image a été ajouté à la galerie";
  panelOfSuccessMessage.appendChild(successMessage);
  return successMessage;
}

function timeDisplaySucessMessage(successMessage) {
  setTimeout(() => {
      successMessage.style.display = 'none';
  }, 5000);
}