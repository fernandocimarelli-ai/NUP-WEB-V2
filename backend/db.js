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
});

module.exports = db;