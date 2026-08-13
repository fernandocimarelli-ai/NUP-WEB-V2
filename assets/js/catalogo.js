async function cargarProductos() {
    const respuesta = await fetch("http://localhost:3000/api/productos");

    if (!respuesta.ok) {
        throw new Error("No fue posible obtener los productos.");
    }

    return respuesta.json();
}

async function cargarCategorias() {
    const respuesta = await fetch("../data/categorias.json");

    if (!respuesta.ok) {
        throw new Error("No fue posible obtener las categorías.");
    }

    return respuesta.json();
}

async function init() {

    try {

        const [productos, categorias] = await Promise.all([
            cargarProductos(),
            cargarCategorias()
        ]);

        const selector = document.getElementById("categoria");
        const buscador = document.getElementById("buscar");
        const grid = document.getElementById("grid");

        selector.innerHTML = `
            <option value="all">Todas</option>
            ${categorias.map(c =>
                `<option value="${c.id}">${c.nombre}</option>`
            ).join("")}
        `;

        function render() {

            const texto = buscador.value.toLowerCase();

            const lista = productos.filter(p => {

                const categoriaOK =
                    selector.value === "all" ||
                    p.categoria === selector.value;

                const nombreOK =
                    p.nombre.toLowerCase().includes(texto);

                return categoriaOK && nombreOK;

            });

            grid.innerHTML = lista.map(p => `
                <article class="card">

                    <img
                        src="../${p.imagen}"
                        alt="${p.nombre}"
                    >

                    <h3>${p.nombre}</h3>

                    <p>${p.descripcion}</p>

                    <a href="producto.html?id=${p.id}">
                        Ver producto
                    </a>

                </article>
            `).join("");

        }

        selector.addEventListener("change", render);
        buscador.addEventListener("input", render);

        render();

    } catch (error) {

        console.error(error);

        document.getElementById("grid").innerHTML = `
            <p>No fue posible cargar el catálogo.</p>
        `;

    }

}

init();