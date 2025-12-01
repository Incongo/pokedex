async function loadFragment(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;

  if (id === "header") {
    const inicioBtn = document.getElementById("iniciobtn");
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");

    // Botón de inicio
    inicioBtn?.addEventListener("click", () => {
      window.location.href = "index.html";
    });

    // Buscador
    function buscarPokemon() {
      const nombre = (searchInput.value || "").trim().toLowerCase();
      if (nombre) window.location.href = `pokemon.html?name=${nombre}`;
    }
    searchBtn?.addEventListener("click", buscarPokemon);
    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") buscarPokemon();
    });
  }
}
// Cargar header y footer

loadFragment("header", "header.html");
loadFragment("footer", "footer.html");
