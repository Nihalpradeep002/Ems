import React from 'react';

function LandingPage({ onLogin }) {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Employee Management System</h1>
        <p style={styles.subtitle}>Simplify your workflow. Empower your team.</p>
        <button style={styles.button} onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: 'white',
    padding: '40px 50px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '15px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

// Add hover effect via inline JS (optional alternative: use CSS-in-JS library)
styles.button[':hover'] = {
  backgroundColor: '#0056b3',
};

export default LandingPage;
