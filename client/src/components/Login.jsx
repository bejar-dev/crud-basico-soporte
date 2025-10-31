import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  // Campos para registro
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [success, setSuccess] = useState('');

  // ---- LOGIN ----
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');

      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---- REGISTRO ----
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: regEmail, password: regPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al registrar usuario');
      setSuccess('✅ Usuario registrado correctamente. Ahora puedes iniciar sesión.');
      setShowRegister(false);
      setName('');
      setRegEmail('');
      setRegPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  // ---- Vista de registro ----
  if (showRegister) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>📝 Registrar cuenta</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <button type="submit">Registrar</button>
          </form>
          <p>
            ¿Ya tienes cuenta?{' '}
            <button className="link-btn" onClick={() => setShowRegister(false)}>
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ---- Vista de login ----
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔧 Sistema de Soporte</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Iniciar sesión</button>
        </form>

        <p>
          ¿No tienes cuenta?{' '}
          <button className="link-btn" onClick={() => setShowRegister(true)}>
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
