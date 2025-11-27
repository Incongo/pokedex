const contenedorPokemon = document.getElementById("pokemons");
const paginationTop = document.getElementById("pagination-top");
const paginationBottom = document.getElementById("pagination-bottom");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

function buscarPokemon() {
  const nombre = searchInput.value.trim().toLowerCase();
  if (nombre) {
    // Redirige a la página dinámica con el parámetro
    window.location.href = `pokemon.html?name=${nombre}`;
  }
}

searchBtn.addEventListener("click", buscarPokemon);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") buscarPokemon();
});

const limit = 20;
let currentPage = 1;
let totalPages = 50; // ~1000 pokémon / 20

async function cargarPokemons(page) {
  contenedorPokemon.innerHTML = "";
  currentPage = page;

  const offset = (page - 1) * limit;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  const data = await response.json();

  for (const pokemon of data.results) {
    const res = await fetch(pokemon.url);
    const info = await res.json();

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${info.name}</h3>
      <p>Altura: ${info.height}</p>
      <p>Peso: ${info.weight}</p>
      <img src="${info.sprites.front_default}" alt="${info.name}">
    `;
    contenedorPokemon.appendChild(card);
  }

  renderPagination(paginationTop);
  renderPagination(paginationBottom);
}

function renderPagination(container) {
  container.innerHTML = "";

  // Botón Inicio
  const firstBtn = document.createElement("button");
  firstBtn.textContent = "Inicio";
  firstBtn.disabled = currentPage === 1;
  firstBtn.onclick = () => cargarPokemons(1);
  container.appendChild(firstBtn);

  // Botón anterior
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Anterior";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => cargarPokemons(currentPage - 1);
  container.appendChild(prevBtn);

  // Botones numerados
  const maxButtons = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxButtons - 1);

  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.classList.add("active");
    }
    btn.onclick = () => cargarPokemons(i);
    container.appendChild(btn);
  }

  // Botón siguiente
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Siguiente";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => cargarPokemons(currentPage + 1);
  container.appendChild(nextBtn);

  // Botón Última
  const lastBtn = document.createElement("button");
  lastBtn.textContent = "Última";
  lastBtn.disabled = currentPage === totalPages;
  lastBtn.onclick = () => cargarPokemons(totalPages);
  container.appendChild(lastBtn);
}

// Primera carga
cargarPokemons(1);

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
