document.addEventListener("DOMContentLoaded", async () => {
  const works = await getWorks();
});

async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
}