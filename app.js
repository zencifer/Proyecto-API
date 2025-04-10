const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // Para leer formularios
app.use(express.static(path.join(__dirname, 'public'))); // Servir HTML

// Registraremos un usuario nuevo
app.post('/registrar', (req, res) => {
    const { nombre, apellido } = req.body;

    if (!nombre || !apellido) {
        return res.status(400).send('Faltan datos');
    }

    db.prepare('INSERT INTO users (nombre, apellido) VALUES (?, ?)').run(nombre, apellido);

    res.send(`<h2>Usuario registrado: ${nombre} ${apellido}</h2><a href="/">Volver</a>`);
});

// Eliminar un usuario por ID
app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
        return res.status(404).send('Usuario no encontrado');
    }

    res.send(`Usuario con ID ${id} eliminado`);
});

// Obtenemos los usuarios actuales de la tabla
app.get('/usuarios', (req, res) => {
    const rows = db.prepare('SELECT * FROM users').all();
    res.json(rows);
});

app.listen(port, () => {
    console.log(`Servidor activo en http:/localhost:${port}`);
});



