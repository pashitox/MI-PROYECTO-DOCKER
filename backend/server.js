const express = require('express');
const cors = require('cors');

// Crear aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de salud para verificar que funciona
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente 🚀',
    timestamp: new Date().toISOString()
  });
});

// Ruta principal de la API
app.get('/api/data', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Juan Pérez', email: 'juan@email.com' },
      { id: 2, name: 'María García', email: 'maria@email.com' }
    ],
    server: 'Express con Docker',
    environment: process.env.NODE_ENV || 'production'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Puerto desde variable de entorno o por defecto 5000
const PORT = process.env.PORT || 8080;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Backend ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});