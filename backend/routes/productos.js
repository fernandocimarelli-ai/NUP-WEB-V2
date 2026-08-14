const router = require("express").Router();

const db = require("../db");

// GET - todos los productos
router.get("/", (req, res) => {
    db.all(
        "SELECT * FROM productos ORDER BY id",
        [],
        (err, productos) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Error al obtener productos"
                });
            }

            res.json(productos);
        }
    );
});

// GET - producto por ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    db.get(
        "SELECT * FROM productos WHERE id = ?",
        [id],
        (err, producto) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Error al obtener el producto"
                });
            }

            if (!producto) {
                return res.status(404).json({
                    error: "Producto no encontrado"
                });
            }

            res.json(producto);
        }
    );
});

// POST - crear producto
router.post("/", (req, res) => {
    const {
        nombre,
        descripcion,
        categoria,
        imagen
    } = req.body;

    if (!nombre) {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }

    const sql = `
        INSERT INTO productos
        (nombre, descripcion, categoria, imagen)
        VALUES (?, ?, ?, ?)
    `;

    db.run(
        sql,
        [nombre, descripcion, categoria, imagen],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Error al crear el producto"
                });
            }

            res.status(201).json({
                id: this.lastID,
                nombre,
                descripcion,
                categoria,
                imagen
            });
        }
    );
});

// PUT - modificar producto
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const {
        nombre,
        descripcion,
        categoria,
        imagen
    } = req.body;

    db.get(
        "SELECT * FROM productos WHERE id = ?",
        [id],
        (err, producto) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Error al buscar el producto"
                });
            }

            if (!producto) {
                return res.status(404).json({
                    error: "Producto no encontrado"
                });
            }

            const actualizado = {
                nombre: nombre ?? producto.nombre,
                descripcion: descripcion ?? producto.descripcion,
                categoria: categoria ?? producto.categoria,
                imagen: imagen ?? producto.imagen
            };

            const sql = `
                UPDATE productos
                SET nombre = ?,
                    descripcion = ?,
                    categoria = ?,
                    imagen = ?
                WHERE id = ?
            `;

            db.run(
                sql,
                [
                    actualizado.nombre,
                    actualizado.descripcion,
                    actualizado.categoria,
                    actualizado.imagen,
                    id
                ],
                function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Error al actualizar el producto"
                        });
                    }

                    res.json({
                        id,
                        ...actualizado
                    });
                }
            );
        }
    );
});

// DELETE - eliminar producto
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    db.get(
        "SELECT * FROM productos WHERE id = ?",
        [id],
        (err, producto) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Error al buscar el producto"
                });
            }

            if (!producto) {
                return res.status(404).json({
                    error: "Producto no encontrado"
                });
            }

            db.run(
                "DELETE FROM productos WHERE id = ?",
                [id],
                function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Error al eliminar el producto"
                        });
                    }

                    res.json({
                        mensaje: "Producto eliminado correctamente",
                        producto
                    });
                }
            );
        }
    );
});

module.exports = router;