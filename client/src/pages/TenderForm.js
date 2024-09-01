import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Tenderform.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

const TenderForm = () => {
  const [title, setTitle] = useState('');
  const { tenderId } = useParams();
  console.log(tenderId);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Open');
  const [userId, setUserId] = useState(" "); // State to hold userId
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
  
        if (!token) {
          console.error('No token found');
          return;
        }
  
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { _id } = response.data;
        console.log('User ID fetched from API:', _id);
        setUserId(_id); // Update state with the fetched user ID
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
  
    fetchUserId();
  }, []); // This effect runs once on component mount
  
  // Another useEffect to log userId when it updates
  useEffect(() => {
    if (userId) {
      console.log('Updated userId state:', userId); // This will log the updated state
    }
  }, [userId]); // This effect runs whenever userId changes
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is required');
      return;
    }

    const newTender = { title, description, deadline, status, userId }; // Include userId
    console.log(newTender);

    try {
      const response = await axios.post('http://localhost:5000/api/tenders/create', newTender);
      setTitle('');
      setDescription('');
      setDeadline('');
      setStatus('Open');

      // Redirect to TenderDetails page with the newly created tender's ID
      navigate(`/tender-details/${response.data._id}`);
    } catch (error) {
      console.error('Error adding tender:', error);
    }
  };
  

  return (
    <form className="tender-form" onSubmit={handleSubmit}>
      <h3>Add New Tender</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Open">Open</option>
        <option value="Submitted">Submitted</option>
        <option value="Awarded">Awarded</option>
      </select>
      <button type="submit">Add Tender</button>
    </form>
  );
};

export default TenderForm;
