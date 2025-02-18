import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Tenderform.css';

const TenderForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Open');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserId(response.data._id);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is required');
      return;
    }

    const newTender = { title, description, deadline, status, userId };

    try {
      const response = await axios.post('http://localhost:5000/api/tenders/create', newTender);
      navigate(`/tender-details/${response.data._id}`);
    } catch (error) {
      console.error('Error adding tender:', error);
    }
  };

  return (
    <div className="tender-form-container">
      <form className="tender-form" onSubmit={handleSubmit}>
        <h2>Create New Tender</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter tender title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter tender description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="Submitted">Submitted</option>
            <option value="Awarded">Awarded</option>
          </select>
        </div>
        <button type="submit">Create Tender</button>
      </form>
    </div>
  );
};

export default TenderForm;

