document.addEventListener("DOMContentLoaded", async () => {
  const works = await getWorks();
  console.table(works)
  displayWorks(works);

  const categories = await getCategories();
  console.table(categories);
  createFilterButtons(categories, works);
});

async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json(); //reponse du body = text alors que reponse.json = plus exploitable
}

function displayWorks(workList) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  
  workList.forEach(work => {
    display(work);
  });

  function display(work) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");
  
    image.src = work.imageUrl;
    image.alt = work.title;
    figcaption.innerHTML = work.title;
  
    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}

async function getCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  return await response.json();
}

function createFilterButtons(categoryList, workList) {
  const buttonsDiv = createEmptyButtonsDiv();

  createButton("Tous", null);
  categoryList.forEach(category => {
    createButton(category.name, category.id);
  });

  function createEmptyButtonsDiv() {
    const portfolioTitle = document.querySelector("#portfolio h2");
    const div = document.createElement("div");
    portfolioTitle.insertAdjacentElement("afterend", div);
    return div;
  }

  function createButton(name, categoryId) {
    const button = document.createElement("button");
    button.innerHTML = name;
    buttonsDiv.appendChild(button);

    button.addEventListener("click", () => {
      const filteredWorks = workList.filter(work => {
        return work.category.id === categoryId || categoryId === null;
      });
      displayWorks(filteredWorks);
    });
  }
}