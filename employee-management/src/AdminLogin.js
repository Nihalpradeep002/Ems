import React, { useState } from 'react';

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = e => {
    e.preventDefault();

    // Simple hardcoded check for demo purposes
    if (username === 'admin' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Admin Login</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 5px 20px rgba(0,0,0,0.1)',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2575fc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginBottom: '10px',
  },
};

export default AdminLogin;
