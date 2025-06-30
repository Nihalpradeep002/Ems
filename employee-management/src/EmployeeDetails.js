import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:5000/employees";

function EmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' });
  const [formErrors, setFormErrors] = useState({});
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = async () => {
    const res = await fetch(`${API_URL}?search=${search}`);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const getNextEmployeeId = () => {
    const ids = employees.map(emp => parseInt(emp.employeeId || '0')).filter(n => !isNaN(n));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "name" && !/^[A-Za-z\s]+$/.test(value)) {
      error = "Name must contain only letters and spaces.";
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email format.";
    }
    if (name === "phone" && value && !/^\d{10}$/.test(value)) {
      error = "Phone number must be 10 digits.";
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
    ["name", "email", "phone"].forEach(field => {
      validateField(field, form[field]);
      if (formErrors[field]) errors[field] = formErrors[field];
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isFormValid()) return;

    const employeeId = editingId ? null : getNextEmployeeId();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const payload = editingId ? form : { ...form, employeeId: String(employeeId) };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      setSubmitError(data.error || 'Something went wrong.');
      return;
    }

    setForm({ name: '', email: '', address: '', phone: '' });
    setEditingId(null);
    setFormErrors({});
    setSubmitError('');
    setShowForm(false);
    fetchEmployees();
  };

  const handleEdit = emp => {
    setForm({
      name: emp.name,
      email: emp.email,
      address: emp.address,
      phone: emp.phone,
    });
    setEditingId(emp._id);
    setFormErrors({});
    setSubmitError('');
    setShowForm(true);
  };

  const handleDelete = async id => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Employee Management</h2>
<div className="d-flex justify-content-between align-items-center mb-4">
  <h2 className="text-center m-0">Employee Management</h2>
  <button
    className="btn btn-outline-danger"
    onClick={() => {
      localStorage.removeItem("token"); 
      window.location.href = "/login";  
    }}
  >
    Logout
  </button>
</div>

      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="text-center mb-4">
        {!showForm && (
          <button className="btn btn-success" onClick={() => {
            setShowForm(true);
            setForm({ name: '', email: '', address: '', phone: '' });
            setEditingId(null);
            setFormErrors({});
            setSubmitError('');
          }}>
            Add New Employee
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
          <h4>{editingId ? "Edit Employee" : "Add New Employee"}</h4>

          {submitError && <div className="alert alert-danger">{submitError}</div>}

          {["name", "email", "phone", "address"].map(field => (
            <div className="mb-3" key={field}>
              <input
                className="form-control"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required={["name", "email"].includes(field)}
              />
              {formErrors[field] && <div className="form-text text-danger">{formErrors[field]}</div>}
            </div>
          ))}

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="list-unstyled mt-5">
        {employees.map(emp => (
          <li key={emp._id} className="border p-3 mb-3 rounded bg-white">
            <p><strong>{emp.name}</strong> — {emp.email} — {emp.phone}</p>
            <p>ID: {emp.employeeId || "N/A"} | Address: {emp.address}</p>
            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(emp)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDetails;