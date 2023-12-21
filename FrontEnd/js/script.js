//alert("new-world");

console.log("hello-world");

// ’appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte

fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then(data => console.log(data))

// supprimer les travaux

// quand le document est chargé, on applique la fonction
document.addEventListener("DOMContentLoaded", function() {
    var gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';
});

// ajout des travaux dans la galerie

data.forEach(data => {
    var figure = document.createElement("figure")
    var image = document.createElement("img")
    var figcaption = document.createElement("figcaption")

    image = data.imageUrl
    image = data.title
    var figcaption.textContent = data.title

    figure.appendChild(image)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
});

