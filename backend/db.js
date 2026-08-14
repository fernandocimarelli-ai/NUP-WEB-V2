const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "data", "nup.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error al abrir SQLite:", err.message);
    } else {
        console.log("SQLite conectado");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            categoria TEXT,
            imagen TEXT
        )
    `);

    db.get(
        "SELECT COUNT(*) AS total FROM productos",
        [],
        (err, row) => {

            if (err) {
                console.error("Error verificando productos:", err.message);
                return;
            }

            if (row.total === 0) {

                db.run(`
                    INSERT INTO productos
                    (nombre, descripcion, categoria, imagen)
                    VALUES (?, ?, ?, ?)
                `,
                [
                    "NUP 60 cc",
                    "Producto natural contra piojos y liendres.",
                    "higiene",
                    "assets/img/producto1.png"
                ],
                (err) => {
                    if (err) {
                        console.error(
                            "Error insertando producto inicial:",
                            err.message
                        );
                    } else {
                        console.log("Producto inicial cargado");
                    }
                });

            }

        }
    );

});

module.exports = db;