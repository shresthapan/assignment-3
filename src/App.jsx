import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Shrestha Pan",
      department: "IT",
      gender: "Female",
      phone: "9876543210",
      localAddress: "Kolkata, WB",
      permAddress: "Kolkata, WB"
    },
    {
      id: "EMP002",
      name: "Rahul Sharma",
      department: "HR",
      gender: "Male",
      phone: "9123456789",
      localAddress: "Salt Lake, Kolkata",
      permAddress: "Asansol, WB"
    }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: 'IT',
    gender: 'Male',
    phone: '',
    localAddress: '',
    permAddress: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name) return alert("Please fill ID and Name!");

    if (isEditing) {
      setEmployees(employees.map(emp => emp.id === formData.id ? formData : emp));
      setIsEditing(false);
    } else {
      if (employees.some(emp => emp.id === formData.id)) {
        return alert("Employee ID must be unique!");
      }
      setEmployees([...employees, formData]);
    }

    setFormData({
      id: '', name: '', department: 'IT', gender: 'Male', phone: '', localAddress: '', permAddress: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setIsEditing(true);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: 'auto' }}>
      <header style={{ background: '#1e293b', color: 'white', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Employee Directory</h2>
        <span>Total Employees: <strong>{employees.length}</strong></span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
        {/* Form */}
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3>{isEditing ? "Edit Employee" : "Add Employee"}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" name="id" placeholder="Employee ID" value={formData.id} onChange={handleInputChange} disabled={isEditing} required />
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
            
            <select name="department" value={formData.department} onChange={handleInputChange}>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>

            <div style={{ display: 'flex', gap: '15px' }}>
              <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleInputChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleInputChange} /> Female</label>
            </div>

            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
            <textarea name="localAddress" placeholder="Local Address" value={formData.localAddress} onChange={handleInputChange} rows="2" />
            <textarea name="permAddress" placeholder="Permanent Address" value={formData.permAddress} onChange={handleInputChange} rows="2" />

            <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {isEditing ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        </div>

        {/* List & Filters */}
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input type="text" placeholder="Search by Name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, padding: '8px' }} />
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} style={{ padding: '8px' }}>
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {filteredEmployees.map(emp => (
              <div key={emp.id} style={{ background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{emp.name} <small style={{ color: '#64748b' }}>({emp.id})</small></h4>
                <p style={{ margin: '3px 0', fontSize: '13px' }}><strong>Dept:</strong> {emp.department} | <strong>Gender:</strong> {emp.gender}</p>
                <p style={{ margin: '3px 0', fontSize: '13px' }}><strong>Phone:</strong> {emp.phone}</p>
                <p style={{ margin: '3px 0', fontSize: '12px', color: '#475569' }}><strong>Local:</strong> {emp.localAddress}</p>
                <p style={{ margin: '3px 0', fontSize: '12px', color: '#475569' }}><strong>Perm:</strong> {emp.permAddress}</p>
                <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                  <button onClick={() => handleEdit(emp)} style={{ flex: 1, background: '#f59e0b', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}