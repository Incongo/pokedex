<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;
async function cargarPokemon() {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("name");

  if (!nombre) return;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
  );
  const info = await res.json();

  document.getElementById("titulo").textContent = info.name;

  // Datos básicos
  const tipos = info.types.map((t) => t.type.name).join(", ");
  document.getElementById("pokemon").innerHTML = `
    <img src="${info.sprites.front_default}" alt="${info.name}">
    <h3>${info.name}</h3>
    <p><strong>Altura:</strong> ${info.height}</p>
    <p><strong>Peso:</strong> ${info.weight}</p>
    <p><strong>Tipos:</strong> ${tipos}</p>
  `;

  // Estadísticas para el gráfico
  const labels = info.stats.map((s) => s.stat.name);
  const values = info.stats.map((s) => s.base_stat);

  const ctx = document.getElementById("statsChart").getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: `Estadísticas de ${info.name}`,
          data: values,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
        },
      },
    },
  });
}
cargarPokemon();
