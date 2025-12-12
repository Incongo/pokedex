// Función para obtener la mejor imagen disponible
function obtenerImagen(info) {
  if (info.sprites?.other?.["official-artwork"]?.front_default) {
    return info.sprites.other["official-artwork"].front_default;
  } else if (info.sprites?.other?.["dream_world"]?.front_default) {
    return info.sprites.other["dream_world"].front_default;
  } else {
    return info.sprites?.front_default || "";
  }
}

async function cargarPokemon() {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("name");
  if (!nombre) return;

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const info = await res.json();

    // Nombre capitalizado
    document.getElementById("titulo").textContent =
      info.name.charAt(0).toUpperCase() + info.name.slice(1);

    // Datos básicos
    const tipos = info.types.map((t) => t.type.name).join(", ");
    const imagen = obtenerImagen(info);

    document.getElementById("pokemon-data").innerHTML = `
      <img src="${imagen}" alt="${info.name}">
      <p><strong>Altura:</strong> ${info.height / 10} m</p>
      <p><strong>Peso:</strong> ${info.weight / 10} kg</p>
      <p><strong>Tipos:</strong> ${tipos}</p>
    `;

    // Estadísticas para gráfico radar
    const labels = info.stats.map((s) => s.stat.name);
    const values = info.stats.map((s) => s.base_stat);

    const ctx = document.getElementById("statsChart").getContext("2d");

    // Colores según tipo principal
    const tipoPrincipal = info.types?.[0]?.type?.name || "normal";
    const colorMapa = {
      electric: {
        bg: "rgba(255,235,59,0.25)",
        border: "rgba(255,235,59,1)",
        point: "rgba(255,193,7,1)",
      },
      fire: {
        bg: "rgba(244,67,54,0.25)",
        border: "rgba(244,67,54,1)",
        point: "rgba(183,28,28,1)",
      },
      water: {
        bg: "rgba(33,150,243,0.25)",
        border: "rgba(33,150,243,1)",
        point: "rgba(13,71,161,1)",
      },
      grass: {
        bg: "rgba(76,175,80,0.25)",
        border: "rgba(76,175,80,1)",
        point: "rgba(27,94,32,1)",
      },
      psychic: {
        bg: "rgba(233,30,99,0.25)",
        border: "rgba(233,30,99,1)",
        point: "rgba(136,14,79,1)",
      },
      rock: {
        bg: "rgba(141,110,99,0.25)",
        border: "rgba(141,110,99,1)",
        point: "rgba(78,52,46,1)",
      },
      ground: {
        bg: "rgba(161,136,127,0.25)",
        border: "rgba(161,136,127,1)",
        point: "rgba(93,64,55,1)",
      },
      ice: {
        bg: "rgba(0,188,212,0.25)",
        border: "rgba(0,188,212,1)",
        point: "rgba(0,96,100,1)",
      },
      dragon: {
        bg: "rgba(103,58,183,0.25)",
        border: "rgba(103,58,183,1)",
        point: "rgba(49,27,146,1)",
      },
      dark: {
        bg: "rgba(33,33,33,0.25)",
        border: "rgba(33,33,33,1)",
        point: "rgba(0,0,0,1)",
      },
      fairy: {
        bg: "rgba(248,187,208,0.35)",
        border: "rgba(240,98,146,1)",
        point: "rgba(194,24,91,1)",
      },
      normal: {
        bg: "rgba(207,216,220,0.35)",
        border: "rgba(120,144,156,1)",
        point: "rgba(69,90,100,1)",
      },
      fighting: {
        bg: "rgba(211,47,47,0.25)",
        border: "rgba(211,47,47,1)",
        point: "rgba(127,0,0,1)",
      },
      poison: {
        bg: "rgba(156,39,176,0.25)",
        border: "rgba(156,39,176,1)",
        point: "rgba(74,20,140,1)",
      },
      bug: {
        bg: "rgba(139,195,74,0.25)",
        border: "rgba(139,195,74,1)",
        point: "rgba(85,139,47,1)",
      },
      ghost: {
        bg: "rgba(96,125,139,0.25)",
        border: "rgba(96,125,139,1)",
        point: "rgba(38,50,56,1)",
      },
    };
    const colores = colorMapa[tipoPrincipal] || colorMapa.normal;

    new Chart(ctx, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: `Estadísticas de ${info.name}`,
            data: values,
            backgroundColor: colores.bg,
            borderColor: colores.border,
            pointBackgroundColor: colores.point,
            pointBorderColor: colores.border,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { r: { beginAtZero: true } },
        plugins: { legend: { display: true } },
      },
    });

    // 👉 Llamar a evoluciones al final
    await cargarEvoluciones(info);
  } catch (error) {
    document.getElementById("titulo").textContent = "Error: " + error.message;
  }
}

// Evoluciones con cartas estilo index y flechas responsivas
async function cargarEvoluciones(info) {
  try {
    const resSpecies = await fetch(info.species.url);
    const speciesData = await resSpecies.json();

    const resChain = await fetch(speciesData.evolution_chain.url);
    const chainData = await resChain.json();

    const evoluciones = [];
    let actual = chainData.chain;
    while (actual) {
      evoluciones.push(actual.species.name);
      actual = actual.evolves_to?.[0];
    }

    const evoContainer = document.createElement("div");
    evoContainer.id = "evoluciones";
    evoContainer.innerHTML = "";

    const evoList = document.createElement("div");
    evoList.className = "evo-list";

    for (let i = 0; i < evoluciones.length; i++) {
      const nombre = evoluciones[i];
      const resPoke = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
      );
      const pokeData = await resPoke.json();
      const img = obtenerImagen(pokeData);

      const tipoPrincipal = pokeData.types?.[0]?.type?.name || "normal";
      const claseIcono = `type-icon type-${tipoPrincipal}`;

      const card = document.createElement("div");
      card.className = `card ${tipoPrincipal}`;
      card.innerHTML = `
        <div class="card-header">
          <h3>${
            pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)
          }</h3>
        </div>
        <div class="card-body">
          <img src="${img}" alt="${pokeData.name}">
        </div>
        <div class="card-footer">
          <span class="${claseIcono}"></span>
        </div>
      `;

      // Hacer la carta clicable
      card.addEventListener("click", () => {
        window.location.href = `pokemon.html?name=${pokeData.name}`;
      });

      evoList.appendChild(card);

      if (i < evoluciones.length - 1) {
        const arrow = document.createElement("div");
        arrow.className = "arrow";
        evoList.appendChild(arrow);
      }
    }

    evoContainer.appendChild(evoList);

    // 👉 Insertar evoluciones al final del bloque #pokemon
    const pokemonDiv = document.getElementById("pokemon");
    pokemonDiv.appendChild(evoContainer);
  } catch (error) {
    console.error("Error cargando evoluciones:", error);
  }
}

cargarPokemon();
