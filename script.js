async function loadFragment(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;

  if (id === "header") {
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const inicioBtn = document.getElementById("iniciobtn");

    // Botón de inicio
    if (inicioBtn) {
      inicioBtn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }

    // Buscador
    function buscarPokemon() {
      const nombre = (searchInput.value || "").trim().toLowerCase();
      if (nombre) {
        window.location.href = `pokemon.html?name=${nombre}`;
      }
    }

    searchBtn?.addEventListener("click", buscarPokemon);
    searchInput?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") buscarPokemon();
    });
  }
}

// Cargar header y footer
loadFragment("header", "header.html");
loadFragment("footer", "footer.html");

document.addEventListener("DOMContentLoaded", () => {
  const contenedorPokemon = document.getElementById("pokemons");
  const paginationTop = document.getElementById("pagination-top");
  const paginationBottom = document.getElementById("pagination-bottom");

  const limit = 20;
  let currentPage = 1;
  let totalPages = 1;

  // Función para obtener la mejor imagen disponible
  function obtenerImagen(info) {
    if (info.sprites.other["official-artwork"].front_default) {
      return info.sprites.other["official-artwork"].front_default;
    } else if (info.sprites.other["dream_world"].front_default) {
      return info.sprites.other["dream_world"].front_default;
    } else {
      return info.sprites.front_default;
    }
  }

  // Función para capitalizar nombre
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Crear tarjeta estilo carta coleccionable

  function crearTarjeta(info) {
    const tipoPrincipal = info.types?.[0]?.type?.name || "normal";
    const imagen = obtenerImagen(info);
    const claseIcono = `type-icon type-${tipoPrincipal}`;

    const card = document.createElement("div");
    card.className = `card ${tipoPrincipal}`;

    // ID único para aplicar transformaciones al ::before
    card.dataset.id = crypto.randomUUID();

    card.innerHTML = `
      <div class="card-header">
        <h3>${capitalize(info.name)}</h3>
      </div>
      <div class="card-body">
        <img src="${imagen}" alt="${info.name}">
      </div>
      <div class="card-footer">
        <span class="${claseIcono}"></span>
      </div>
    `;

    // Solo rotaciones compatibles con textura rectangular
    const rotations = ["0deg", "180deg"];

    // Solo volteos horizontales (no tocamos la proporción vertical)
    const flips = ["scaleX(1)", "scaleX(-1)"];

    const randomRotation =
      rotations[Math.floor(Math.random() * rotations.length)];
    const randomFlip = flips[Math.floor(Math.random() * flips.length)];

    // Creamos un estilo dinámico para el ::before de esta carta
    const style = document.createElement("style");
    style.innerHTML = `
      .card[data-id="${card.dataset.id}"]::before {
          transform: ${randomFlip} rotate(${randomRotation});
      }
    `;
    document.head.appendChild(style);

    card.addEventListener("click", () => {
      window.location.href = `pokemon.html?name=${info.name}`;
    });

    return card;
  }

  // 👉 Cargar lista de Pokémon con paginación
  async function cargarPokemons(page = 1) {
    contenedorPokemon.innerHTML = "";
    currentPage = page;

    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.count && data.count > 0) {
        totalPages = Math.ceil(data.count / limit);
      }

      for (const pokemon of data.results) {
        const res = await fetch(pokemon.url);
        const info = await res.json();
        const card = crearTarjeta(info);
        contenedorPokemon.appendChild(card);
      }

      renderPagination(paginationTop);
      renderPagination(paginationBottom);
    } catch (error) {
      console.error("Error cargando datos:", error);
      contenedorPokemon.innerHTML = "<p>Error cargando Pokémons.</p>";
    }
  }

  // 👉 Renderizar botones de paginación
  function renderPagination(container) {
    if (!container) return;
    container.innerHTML = "";

    const firstBtn = document.createElement("button");
    firstBtn.textContent = "Inicio";
    firstBtn.disabled = currentPage === 1;
    firstBtn.onclick = () => cargarPokemons(1);
    container.appendChild(firstBtn);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Anterior";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => cargarPokemons(currentPage - 1);
    container.appendChild(prevBtn);

    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => cargarPokemons(i);
      container.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Siguiente";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => cargarPokemons(currentPage + 1);
    container.appendChild(nextBtn);

    const lastBtn = document.createElement("button");
    lastBtn.textContent = "Última";
    lastBtn.disabled = currentPage === totalPages;
    lastBtn.onclick = () => cargarPokemons(totalPages);
    container.appendChild(lastBtn);
  }

  // 👉 Cargar primera página al inicio
  cargarPokemons(1);
});

// OTRA FORMA DE HACERLO CON PROMESAS
// fetch("https://pokeapi.co/api/v2/pokemon")
//   .then((response) => response.json())
//   .then((data) => {
//     data.results.forEach((pokemon) => {
//       // Hacemos otra llamada a la URL de cada Pokémon
//       fetch(pokemon.url)
//         .then((res) => res.json())
//         .then((info) => {
//           // Creamos la tarjeta
//           const card = document.createElement("div");
//           card.className = "card";

//           // Tipos del pokémon
//           const tipos = info.types.map((t) => t.type.name).join(", ");

//           card.innerHTML = `
//             <img src="${info.sprites.front_default}" alt="${info.name}">
//             <div class="card-content">
//               <h3>${info.name}</h3>
//               <p><strong>Tipos:</strong> ${tipos}</p>
//               <p><strong>Altura:</strong> ${info.height} | <strong>Peso:</strong> ${info.weight}</p>
//             </div>
//           `;
//           contenedorPokemon.appendChild(card);
//         })
//         .catch((err) => console.error("Error cargando detalles:", err));
//     });
//   })
//   .catch((er) => console.error("Error cargando lista:", er));
