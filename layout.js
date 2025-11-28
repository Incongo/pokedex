async function loadFragment(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;

  if (id === "header") {
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");

    function buscarPokemon() {
      const nombre = (searchInput.value || "").trim().toLowerCase();
      if (nombre) {
        window.location.href = `pokemon.html?name=${nombre}`;
      }
    }

    searchBtn?.addEventListener("click", buscarPokemon);
    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") buscarPokemon();
    });
  }
}

loadFragment("header", "header.html");
loadFragment("footer", "footer.html");
