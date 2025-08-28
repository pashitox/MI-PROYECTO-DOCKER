import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'https://mi-proyecto-docker-7z02.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/data`);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Mi Aplicación Dockerizada</h1>
        <p>Frontend + Backend con Docker Compose</p>
        
        {loading && <p className="loading">⏳ Cargando datos del backend...</p>}
        
        {error && (
          <div className="error">
            <h3>❌ Error:</h3>
            <p>{error}</p>
            <small>Verifica que el backend esté ejecutándose en {API_URL}</small>
          </div>
        )}
        
        {data && (
          <div className="data-container">
            <h2>📊 Datos del Backend:</h2>
            <div className="server-info">
              <strong>Servidor:</strong> {data.server}
              <br />
              <strong>Entorno:</strong> {data.environment}
            </div>
            
            <h3>👥 Usuarios:</h3>
            <div className="users-list">
              {data.users.map(user => (
                <div key={user.id} className="user-card">
                  <strong>{user.name}</strong>
                  <br />
                  <small>{user.email}</small>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="links">
          <a href={`${API_URL}/api/health`} target="_blank" rel="noopener noreferrer">
            🔍 Ver Health Check del Backend
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
