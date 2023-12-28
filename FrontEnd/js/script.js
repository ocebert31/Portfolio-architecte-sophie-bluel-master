document.addEventListener("DOMContentLoaded", async() => {

  displayWorks(works)
});

async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}
