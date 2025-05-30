import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rate' || name === 'count') {
      setFormData((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      id: parseInt(formData.id),
      price: parseFloat(formData.price),
      rating: {
        rate: parseFloat(formData.rating.rate),
        count: parseInt(formData.rating.count)
      }
    };

    try {
      const res = await fetch('http://localhost:4000/api/shopping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      const data = await res.json();

      if (data.success || res.ok) {
        alert('Product created successfully!');
        navigate('/');
      } else {
        alert('Error creating product.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error.');
    }
  };

  return (
    <div className="admin-container">
      {/* 🔙 Back arrow */}
      <div className="back-arrow" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="number" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <input type="number" step="0.1" name="rate" placeholder="Rating Rate" value={formData.rating.rate} onChange={handleChange} required />
        <input type="number" name="count" placeholder="Rating Count" value={formData.rating.count} onChange={handleChange} required />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default Admin;
