// Fonction qui crée la modale 
function createUpdateModalee() {
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

    
    displayTitleModal();  
}

// Fonction qui affiche le titre de la modale 
function displayTitleModal() {
    const title = document.createElement("p");
    title.style = "font-family: Work Sans; font-size: 26px; text-align: center; margin-top: 30px;";
    title.innerText = "Ajout photo";
    title.id = "title";
    let modal = document.getElementById("myModal");
    modal.appendChild(title);
}

