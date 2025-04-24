// backend/index.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configura tu conexión PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// Obtener todos los vehículos
app.get("/vehiculos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vehiculos ORDER BY codigo DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los vehículos" });
  }
});

// Registrar un nuevo vehículo
app.post("/vehiculos", async (req, res) => {
  const datos = req.body;
  try {
    const campos = Object.keys(datos).join(", ");
    const valores = Object.values(datos);
    const parametros = valores.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO vehiculos (${campos}) VALUES (${parametros}) RETURNING *`;
    const result = await pool.query(query, valores);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar el vehículo" });
  }
});

// Endpoints para cargar listas desplegables (foreign key)
const tablasTipo = [
  "tipocombustible",
  "clasevehiculo",
  "tipocarroceria",
  "tiporemolque",
  "categoriavehiculo",
  "tipocabina",
  "personas",
  "empresas"
];

tablasTipo.forEach((tabla) => {
  app.get(`/${tabla}`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${tabla} ORDER BY id ASC`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Error al obtener datos de ${tabla}` });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
