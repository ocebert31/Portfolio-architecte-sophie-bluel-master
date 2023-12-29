document.addEventListener("DOMContentLoaded", async() => {
  const works = await getWorks();
  console.table(works);
  displayWorks(works);
 
  const categories = await getCategories();
  console.table(categories); 
  // allButton(works);
  displayCategoriesButton(categories, works);
});

async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
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
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

// function allButton(works) {
//   const div = document.createElement("div");
//   const introductionTitle = document.querySelector("#portfolio h2")
//   introductionTitle.insertAdjacentElement("afterend", div);

//   let button = document.createElement("button");
//   button.innerText = "Tous"
//   div.appendChild(button)
//   button.addEventListener("click", () => {
//     displayWorks(works)
//   });
// }

function displayCategoriesButton(categoryList, workList) {
  const divButton = divButton()
  
  function divButton() {
    const div = document.createElement("div");
    const introductionTitle = document.querySelector("#portfolio h2")
    introductionTitle.insertAdjacentElement("afterend", div);
  }
  
    button("Tous", null)
    categoryList.forEach((category) => {
    button(categoryName, categoryId)
  })

  function filterButton(categoryName, categoryId)
    let button = document.createElement("button");
    button.innerText = categoryName;
    div.appendChild(button)
    button.addEventListener("click", () => {
      const workfilter = workList.filter((work) => work.category.id === categoryId || categoryId === null);
      displayWorks(workfilter)
    });
}

