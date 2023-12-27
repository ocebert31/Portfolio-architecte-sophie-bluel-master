// variable (globale) permettant de stocker les données (issues de l'API) des travaux
let categories;

/**
 * fonction asynchrone qui récupère les catégories (Utilisation de THEN et ASYNC / AWAIT)
 */
const getCategories = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => {
      // console.log(response);
      // une fois qu'on a une réponse de l'API, on vérifie que le statut de la promesse est 200, et si oui, on renvoie les données au format JSON
      if (response.status === 200) {
        //console.log(response.json());
        return response.json();
      } else {
        console.log("la requête n'a pas abouti");
      }
    })
    .then((data) => {
      // console.log(data);
      // une fois qu'on a les données de l'API, on alimente la variable globale (categories) avec les données
      categories = data;
    });
};

/*
 * fonction asynchrone qui récupère les travaux (Cette syntaxe est nettement plus courte et plus claire que la précédente)
 */
const getWorks = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    // console.log(response);
    const data = await response.json();
    // console.table(data);
    return data;
  } catch (error) {
    console.log(`Un erreur est survenue : ${error}`);
  }
};

/**
 * Fonction qui affiche les travaux dans la page (A REDIGER !!!)
 */
const displayWorks = (works) => {
    console.log(works);
    const gallery = document.querySelector(".gallery");

    // Appel de la fonction afficherTravaux pour créer les éléments dans le DOM
    afficherTravaux(works, gallery);

    // Fonction pour créer et ajouter des éléments HTML à la galerie
    function afficherTravaux(data, gallery) {
        data.forEach(element => {
            let figure = document.createElement("figure");
            let image = document.createElement("img");
            let figcaption = document.createElement("figcaption");

            image.src = element.imageUrl;
            image.alt = element.title;
            figcaption.textContent = element.title;

            figure.appendChild(image);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    }
};

/**
 * Fonction qui affiche les boutons de filtre dans la page (A REDIGER !!!)
 */
const displayButtonFilters = (categories) => {
  console.log(categories);
  let introduction = document.getElementById("introduction");

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.id = category.name.toLowerCase();
    button.addEventListener("click", function () {
      alert("Vous avez cliqué sur le bouton " + category.name);
    });
    introduction.appendChild(button);
  });
};
/**
 * Fonction qui permet de filtrer les travaux par catégorie
 */
const filterByCategory = (idCategory, works) => {
  console.log("ID de la catégorie filtrée :", idCategory);
  console.log("Travaux à filtrer :", works)
 
  // on peut maintenant filtrer les travaux par catégorie (A REDIGER !!!)
  // Filtre les travaux en fonction de la catégorie sélectionnée
  const filteredWorks = works.filter(work => work.category === idCategory);
  console.log("Travaux filtrés :", filteredWorks)
  
  // Affiche les travaux filtrés dans la galerie
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ''; // Supprime les éléments actuels dans la galerie

  // Appel de la fonction displayWorks pour créer les éléments dans le DOM avec les travaux filtrés
  displayWorks(filteredWorks);
};
console.log("pouet")
/**************************************************************************** */
/**
 * au chargement de la page
 */
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Au chargement de la page");

  // supprimer les travaux
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = '';

  let works;

  try {
    works = await getWorks();
    console.log(works);
  } catch (error) {
    console.log(`Une erreur est survenue lors de la récupération des travaux : ${error}`);
    works = []; // Initialiser works avec une valeur par défaut pour éviter qu'il ne soit indéfini
  }

  // exécution de la fonction permmetant d'alimenter la variable globale categories
  await getCategories();
  console.log(categories);

  // exécution de la fonction qui affiche les travaux
  displayWorks(works);

  // exécution de la fonction qui affiche les filtres
  displayButtonFilters(categories);


  let boutonFilters = document.getElementById("introduction")
   // Evénement Filtre par catégorie (utilisation de la classe CSS)
   boutonFilters.addEventListener("click", function (clic) {
    // ON commence par récupérer l'ID du bouton Cliqué (qui correspond à l'ID de la catégorie pour le filtre)
    //console.log(clic);
    //console.log("TARGET : ", clic.target);
    const idCategory = clic.target.id;
    //console.log("ID de la catégorie cliquée :", idCategory);

    // UNE fois qu'on a l'ID de la catégorie, on peut filtrer
    // reponse(idCategory);
    filterByCategory(idCategory, works);
  });
});





























/* 




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
function getWorks () {
    fetch("http://localhost:5678/api/works")
    .then(resultats => resultats.json())
    .then(reponses => console.table(reponses) )

function categories () {
    fetch("http://localhost:5678/api/categories")
    .then(resultat => resultat.json())
    .then(reponse => console.table(reponse) )
}


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
    boutonObjets.id=1
    boutonObjets.appendChild(contenuObjets);
    gallery.appendChild(boutonObjets);

    // Ajout d'un gestionnaire d'événements pour afficher tous les travaux lorsque le bouton "Tous" est cliqué
    boutonTous.addEventListener("click", function() {
        showAllProjects();
    });

    boutonObjets.addEventListener("click", function(click) {
        const idCategory = clic.target.id
        reponse (idCategory);
    });
});

 */


