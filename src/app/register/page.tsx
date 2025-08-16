
'use client';
import React, { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, userType })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Registro exitoso, ahora puedes iniciar sesión');
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de red o servidor');
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="mb-4 text-primary text-center">Regístrate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de usuario</label>
            <select className="form-select" value={userType} onChange={e => setUserType(e.target.value)}>
              <option value="client">Cliente</option>
              <option value="guide">Guía</option>
            </select>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <a href="/login" className="text-decoration-none text-secondary">¿Ya tienes cuenta? <span className="text-primary">Inicia sesión</span></a>
        </div>
      </div>
    </div>
  );
}
