import React from 'react';

function LandingPage({ onLogin }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)' }}>
      <div className="bg-white p-5 rounded-4 shadow text-center" style={{ maxWidth: '400px', width: '90%' }}>
        <h1 className="mb-3">🚀 Employee Management System</h1>
        <p className="text-muted mb-4">Simplify your workflow. Empower your team.</p>
        <button className="btn btn-primary px-4 py-2 rounded-pill fw-bold" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
