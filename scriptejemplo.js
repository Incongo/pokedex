const usuariosDiv = document.getElementById("usuarios");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((usuario) => {
   
   const 
   
   
     //   const p = document.createElement("p");
    //  p.textContent = `Nombre: ${usuario.name} - Email: ${usuario.email}`;
      //usuariosDiv.appendChild(p);
    });
    console.log(data);
  })
  .catch((er) => console.error("Error:, fetchin data:", er));
