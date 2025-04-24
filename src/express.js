require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

if (!process.env.DATABASE_URL) {
  console.error("❌ URL_DB no está definida. Verifica tu archivo .env");
  process.exit(1);
}

console.log("🌐 Conectando a:", process.env.DATABASE_URL);

// Sequelize config
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

sequelize.authenticate()
  .then(() => console.log("✅ Conexión exitosa a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión:", err));

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.get('/db_kentwork/tipovehiculo', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM tipovehiculo");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener tipovehiculo:", err);
      res.status(500).json({ error: 'Error al obtener tipovehiculo' });
    }
  });
  
  app.get('/db_kentwork/tipocombustible', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM tipocombustible");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener tipocombustible:", err);
      res.status(500).json({ error: 'Error al obtener tipocombustible' });
    }
  });
  
  app.get('/db_kentwork/clasevehiculo', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM clasevehiculo");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener clasevehiculo:", err);
      res.status(500).json({ error: 'Error al obtener clasevehiculo' });
    }
  });
  
  app.get('/db_kentwork/tipocarroceria', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM tipocarroceria");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener tipocarroceria:", err);
      res.status(500).json({ error: 'Error al obtener tipocarroceria' });
    }
  });
  
  app.get('/db_kentwork/categoriavehiculo', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM categoriavehiculo");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener categoriavehiculo:", err);
      res.status(500).json({ error: 'Error al obtener categoriavehiculo' });
    }
  });
  
  app.get('/db_kentwork/tipocabina', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM tipocabina");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener tipocabina:", err);
      res.status(500).json({ error: 'Error al obtener tipocabina' });
    }
  });
  
  app.get('/db_kentwork/tiporemolque', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM tiporemolque");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener tiporemolque:", err);
      res.status(500).json({ error: 'Error al obtener tiporemolque' });
    }
  });
  
  app.get('/db_kentwork/personas', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM personas");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener personas:", err);
      res.status(500).json({ error: 'Error al obtener personas' });
    }
  });
  
  app.get('/db_kentwork/empresas', async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT * FROM empresas");
      res.json(results);
    } catch (err) {
      console.error("Error al obtener empresas:", err);
      res.status(500).json({ error: 'Error al obtener empresas' });
    }
  });
  

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${port}`);
});
