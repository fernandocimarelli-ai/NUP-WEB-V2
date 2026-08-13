(async () => {

    const id = new URLSearchParams(location.search).get("id");

    try {

        const productos = await fetch("http://localhost:3000/api/productos")
            .then(r => {
                if (!r.ok) {
                    throw new Error("No se pudieron obtener los productos.");
                }
                return r.json();
            });

        const producto =
            productos.find(p => String(p.id) === id) || productos[0];

        if (!producto) {

            document.getElementById("producto").innerHTML =
                "<p>No se encontró el producto.</p>";

            return;
        }

        document.getElementById("producto").innerHTML = `
            <h1>${producto.nombre}</h1>

            ${producto.imagen ? `
                <img
                    src="../${producto.imagen}"
                    alt="${producto.nombre}">
            ` : ""}

            <p>${producto.descripcion ?? ""}</p>

            <p>
                <strong>Categoría:</strong>
                ${producto.categoria ?? "-"}
            </p>
        `;

    } catch (error) {

        console.error(error);

        document.getElementById("producto").innerHTML =
            "<p>Error cargando el producto.</p>";

    }

})();