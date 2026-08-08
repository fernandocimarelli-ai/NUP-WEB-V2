const router = require("express").Router();

const productos = require("../data/productos");

// Obtener todos los productos
router.get("/", (req, res) => {
    res.json(productos);
});

// Obtener un producto por ID
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

module.exports = router;