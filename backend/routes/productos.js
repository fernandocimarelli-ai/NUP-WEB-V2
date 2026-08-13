const router = require("express").Router();

const productos = require("../data/productos");

// GET - todos los productos
router.get("/", (req, res) => {
    res.json(productos);
});

// GET - producto por ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    res.json(producto);
});

// POST - crear producto
router.post("/", (req, res) => {
    const nuevo = {
        id: productos.reduce(
            (max, p) => Math.max(max, Number(p.id) || 0),
            0
        ) + 1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        imagen: req.body.imagen
    };

    productos.push(nuevo);

    res.status(201).json(nuevo);
});
// PUT - modificar producto
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    producto.nombre = req.body.nombre ?? producto.nombre;
    producto.descripcion = req.body.descripcion ?? producto.descripcion;
    producto.categoria = req.body.categoria ?? producto.categoria;
    producto.imagen = req.body.imagen ?? producto.imagen;

    res.json(producto);
});
module.exports = router;
// DELETE - eliminar producto
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    const eliminado = productos.splice(indice, 1)[0];

    res.json({
        mensaje: "Producto eliminado correctamente",
        producto: eliminado
    });
});