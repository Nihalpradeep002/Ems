import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:5000/employees";

function EmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    employeeId: ''
  });
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    const res = await fetch(`${API_URL}?search=${search}`);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }

    setForm({ name: '', email: '', address: '', phone: '', employeeId: '' });
    setEditingId(null);
    fetchEmployees();
  };

  const handleEdit = emp => {
    setForm({
      name: emp.name,
      email: emp.email,
      address: emp.address,
      phone: emp.phone,
      employeeId: emp.employeeId
    });
    setEditingId(emp._id);
  };

  const handleDelete = async id => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Management</h2>

      <input
        type="text"
        placeholder="Search by name, email, or ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '300px' }}
      />

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {employees.map(emp => (
          <li key={emp._id} style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px' }}>
            <strong>{emp.name}</strong> — {emp.email} — {emp.phone} <br />
            ID: {emp.employeeId} | Address: {emp.address} <br />
            <button onClick={() => handleEdit(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp._id)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDetails;
