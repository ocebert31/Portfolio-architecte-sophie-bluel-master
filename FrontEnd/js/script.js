//alert("new-world");

console.log("hello-world");

// supprimer les travaux
// quand le document est chargé, on applique la fonction
document.addEventListener("DOMContentLoaded", function() {
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';

    // ’appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte
    fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(data => afficherTravaux(data, gallery)) // fonction asynchrone qui sera executée quand la reponse de fetch arrivera
});

// ajout des travaux dans la galerie

function afficherTravaux(data, gallery) {
    data.forEach(element => { //data = tableau, element = element en cours du tableau
        let figure = document.createElement("figure")
        let image = document.createElement("img")
        let figcaption = document.createElement("figcaption")
    
        image.src = element.imageUrl;
        image.alt = element.title;
        figcaption.textContent = element.title;
    
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}


// 2e appel à l'API
fetch("http://localhost:5678/api/works")
.then(resultats => resultats.json())
.then(réponses => console.table(réponses) )

fetch("http://localhost:5678/api/categories")
.then(resultat => resultat.json())
.then(réponse => console.table(réponse) )



document.addEventListener("DOMContentLoaded", function() {
    let gallery = document.querySelector(".gallery");


    // Création du bouton "Tous"
    let boutonTous = document.createElement("button");
    let contenuTous = document.createTextNode("Tous");
    boutonTous.appendChild(contenuTous);
    gallery.appendChild(boutonTous);

    // Création du bouton "Tous"
    let boutonObjets = document.createElement("button");
    let contenuObjets = document.createTextNode("Objets");
    boutonObjets.appendChild(contenuObjets);
    gallery.appendChild(boutonObjets);

    // Ajout d'un gestionnaire d'événements pour afficher tous les travaux lorsque le bouton "Tous" est cliqué
    boutonTous.addEventListener("click", function() {
        showAllProjects();
    });

    boutonObjets.addEventListener("click", function() {
        réponse("id=1");
    });
});




