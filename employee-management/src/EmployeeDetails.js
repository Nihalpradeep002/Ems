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
  const [formErrors, setFormErrors] = useState({});
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const fetchEmployees = async () => {
    const res = await fetch(`${API_URL}?search=${search}`);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!/^[A-Za-z\s]+$/.test(value)) error = "Name must contain only letters and spaces.";
    }

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
    }

    if (name === "phone") {
      if (value && !/^\d{10}$/.test(value)) error = "Phone number must be 10 digits.";
    }

    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const isFormValid = () => {
    const errors = {};
    validateField("name", form.name);
    validateField("email", form.email);
    validateField("phone", form.phone);

    Object.keys(form).forEach(field => {
      const value = form[field];
      validateField(field, value);
      if (formErrors[field]) errors[field] = formErrors[field];
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isFormValid()) return;

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setSubmitError(data.error || 'Something went wrong.');
      return;
    }

    setForm({ name: '', email: '', address: '', phone: '', employeeId: '' });
    setEditingId(null);
    setFormErrors({});
    setSubmitError('');
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
    setFormErrors({});
    setSubmitError('');
  };

  const handleDelete = async id => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '700px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Employee Management</h2>

      <input
        type="text"
        placeholder=" Search by name, email, or ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={inputStyle}
      />

      <form onSubmit={handleSubmit} style={{ marginTop: '20px', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <h3>{editingId ? "Edit Employee" : "Add New Employee"}</h3>

        {submitError && <p style={{ color: 'red', fontWeight: 'bold' }}>⚠ {submitError}</p>}

        {["name", "email", "phone", "address", "employeeId"].map(field => (
          <div key={field} style={{ marginBottom: '15px' }}>
            <input
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required={["name", "email", "employeeId"].includes(field)}
              style={inputStyle}
            />
            {formErrors[field] && <p style={errorText}>{formErrors[field]}</p>}
          </div>
        ))}

        <button type="submit" style={submitBtn}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
        {employees.map(emp => (
          <li key={emp._id} style={employeeCard}>
            <strong>{emp.name}</strong> — {emp.email} — {emp.phone}<br />
            ID: {emp.employeeId} | Address: {emp.address}<br />
            <button onClick={() => handleEdit(emp)} style={editBtn}>Edit</button>
            <button onClick={() => handleDelete(emp._id)} style={deleteBtn}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginBottom: '5px'
};

const errorText = {
  color: 'red',
  fontSize: '13px',
  marginTop: '2px',
  marginLeft: '2px'
};

const submitBtn = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '10px'
};

const editBtn = {
  padding: '6px 12px',
  marginRight: '10px',
  backgroundColor: '#ffc107',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const deleteBtn = {
  padding: '6px 12px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const employeeCard = {
  border: '1px solid #ccc',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '8px',
  background: '#fff'
};

export default EmployeeDetails;
