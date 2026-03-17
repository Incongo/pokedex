# 🃏 Pokedex Interactiva

Una Pokédex web interactiva y visualmente atractiva que consume la [PokeAPI](https://pokeapi.co/) para mostrar información detallada de los Pokémon. Incluye tarjetas con efectos especiales, gráficos de estadísticas y un diseño moderno.

![Vista previa del proyecto](./img/preview.png) *(Asegúrate de crear una captura de pantalla y guardarla como `img/preview.png`)*

## ✨ Características

- **Listado de Pokémon**: Visualización de Pokémon en tarjetas interactivas.
- **Efectos visuales**: Tarjetas con efectos "carta" y reflejos dinámicos (implementado en `styles.css`).
- **Detalle del Pokémon**: Página individual (`pokemon.html`) con información ampliada.
- **Gráfico de estadísticas base**: Integración con Chart.js (`chart.js`) para mostrar las stats de cada Pokémon en un gráfico de radar.
- **Diseño responsive**: Cabecera (`header.html`) y pie de página (`footer.html`) consistentes.
- **Navegación fluida**: Lógica en `layout.js` y `script.js` para una experiencia de usuario dinámica.

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura de las páginas (`index.html`, `pokemon.html`).
- **CSS3**: Estilos avanzados con efectos y animaciones (`styles.css`).
- **JavaScript (ES6+)**: Lógica de la aplicación y consumo de API (`script.js`, `pokemon.js`, `layout.js`).
- **Chart.js**: Librería para la generación de gráficos de estadísticas.
- **PokeAPI**: API pública de donde se obtienen todos los datos de los Pokémon.

## 🚀 Cómo probarlo localmente

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Incongo/pokedex.git
   cd pokedex
Abre el archivo principal

Simplemente abre el archivo index.html en tu navegador web favorito.

No se requiere instalación de dependencias ni servidor adicional, ya que es una aplicación frontend pura.

📂 Estructura del proyecto
text
pokedex/
├── index.html          # Página principal con el listado de Pokémon
├── pokemon.html        # Página de detalle de cada Pokémon
├── header.html         # Cabecera reutilizable
├── footer.html         # Pie de página reutilizable
├── styles.css          # Todos los estilos y efectos visuales
├── script.js           # Lógica principal (listado, carga de datos)
├── pokemon.js          # Lógica para la página de detalle individual
├── layout.js           # Scripts para la maquetación y estructura común
├── chart.js            # Configuración y renderizado de gráficos con Chart.js
├── img/                # Carpeta para imágenes del proyecto
│   └── preview.png     # Captura de pantalla para el README
└── README.md           # Este archivo
📸 Capturas de pantalla
(Incluye aquí algunas capturas para mostrar el proyecto. Te sugiero subirlas a la carpeta img/ y referenciarlas así)

Listado de Pokémon	Detalle con estadísticas
https://./img/screenshot-listado.png	https://./img/screenshot-detalle.png
💡 Funcionalidades destacadas
🎨 Efectos en tarjetas
El archivo styles.css incluye efectos de "carta" y reflejos que hacen que las tarjetas de los Pokémon sean visualmente atractivas e interactivas.

📊 Gráficas de estadísticas
Utilizando Chart.js, en la vista de detalle (pokemon.html) se genera un gráfico de radar que muestra las estadísticas base del Pokémon (velocidad, ataque, defensa, etc.) de forma clara y visual.

🔄 Consumo de API
El proyecto consume la PokeAPI para obtener:

Listado completo de Pokémon.

Detalles específicos (habilidades, tipos, estadísticas, imágenes).

Evoluciones y más información relevante.

🧪 Próximas mejoras posibles
Implementar un buscador en tiempo real.

Añadir paginación o scroll infinito.

Incluir información de evoluciones.

Mejorar la accesibilidad.

Añadir modo oscuro.
