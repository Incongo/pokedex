async function cargarPokemon() {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("name");

  if (!nombre) {
    document.getElementById("titulo").textContent =
      "No se especificó ningún Pokémon";
    return;
  }

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const info = await res.json();

    document.getElementById("titulo").textContent = info.name;

    // Datos básicos
    const contenedor = document.getElementById("pokemon");
    const tipos = info.types.map((t) => t.type.name).join(", ");
    contenedor.innerHTML = `
        <img src="${info.sprites.front_default}" alt="${info.name}">
        <p><strong>Altura:</strong> ${info.height / 10} m </p>
        <p><strong>Peso:</strong> ${info.weight / 10} kg</p>
        <p><strong>Tipos:</strong> ${tipos}</p>
      `;

    // Estadísticas en tabla
    const statsDiv = document.getElementById("stats");
    let tabla = `<table>
        <tr><th>Estadística</th><th>Valor</th></tr>`;
    info.stats.forEach((stat) => {
      tabla += `<tr>
          <td>${stat.stat.name}</td>
          <td>${stat.base_stat}</td>
        </tr>`;
    });
    tabla += `</table>`;
    statsDiv.innerHTML = tabla;
  } catch (error) {
    document.getElementById("titulo").textContent = "Error: " + error.message;
  }
}

cargarPokemon();
