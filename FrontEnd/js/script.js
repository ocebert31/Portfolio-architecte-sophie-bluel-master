// variable (globale) permettant de stocker les données (issues de l'API) des travaux
let categories;
let works;




/**
 * fonction asynchrone qui récupère les catégories (Utilisation de THEN et ASYNC / AWAIT)
 */
const getCategories = async () => {
  return fetch("http://localhost:5678/api/categories")
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
    gallery.innerHTML = ''; // Supprime les éléments actuels dans la galerie

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
  let buttonStyle = "color: white; background-color: green;";

  const boutonTous = document.createElement("button")
  boutonTous.style = buttonStyle;
  boutonTous.textContent = "Tous"
  boutonTous.addEventListener("click", function () {
    displayWorks(works)
  });

  introduction.appendChild(boutonTous)
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.style = buttonStyle;
    button.textContent = category.name;
    button.addEventListener("click", function () {
      filterByCategory(category.id);
    });
    introduction.appendChild(button);
  });
};



/**
 * Fonction qui permet de filtrer les travaux par catégorie
 */
const filterByCategory = (idCategory) => {
  console.log("ID de la catégorie filtrée :", idCategory);
  console.log("Travaux à filtrer :", works)
 
  // on peut maintenant filtrer les travaux par catégorie (A REDIGER !!!)
  // Filtre les travaux en fonction de la catégorie sélectionnée
  const filteredWorks = works.filter(work => work.category.id === idCategory);
  console.log("Travaux filtrés :", filteredWorks)
  console.log("Catégories des travaux :", works.category);

  // Affiche les travaux filtrés dans la galerie

  // Appel de la fonction displayWorks pour créer les éléments dans le DOM avec les travaux filtrés
  displayWorks(filteredWorks);
};




/**************************************************************************** */
/**
 * au chargement de la page
 */
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Au chargement de la page");

  // supprimer les travaux
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = '';

  works = await getWorks();
  console.log(works);

  // exécution de la fonction permmetant d'alimenter la variable globale categories
  await getCategories();
  console.log(categories);

  // exécution de la fonction qui affiche les travaux
  displayWorks(works);

  // exécution de la fonction qui affiche les filtres
  displayButtonFilters(categories);

});