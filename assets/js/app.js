const express = require("express");
const cors = require("cors");
const path = require("path");

const productosRouter = require("./routes/productos");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/productos", productosRouter);

app.get("/api", (req, res) => {
    res.json({
        nombre: "NUP API",
        version: "1.0.0",
        estado: "OK"
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Error interno del servidor"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});