import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PersonalTender.css'; // Import the CSS file

const PersonalTender = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
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
        setUserId(_id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchPersonalTenders = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:5000/api/tenders/${userId}/personal`);
          setTenders(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching personal tenders:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchPersonalTenders();
  }, [userId]);

  const handleTenderClick = (tenderId) => {
    navigate(`/tender/${tenderId}`);
  };

  const handleViewQuotations = (tenderId) => {
    navigate(`/tender/${tenderId}/quotations`);
  };

  const handleViewComparative = (tenderId) => {
    navigate(`/tender/${tenderId}/comparative`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="personal-tender-container">
      <h2>Your Tenders</h2>
      {tenders.length > 0 ? (
        <ul className="tender-list">
          {tenders.map((tender) => (
            <li key={tender._id}>
              <h3>{tender.title}</h3>
              <p>{tender.description}</p>
              <p>Status: {tender.status}</p>
              <p>Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
              <div className="actions">
                <button onClick={() => handleTenderClick(tender._id)}>View Tender</button>
                <button onClick={() => handleViewQuotations(tender._id)}>View Applied Quotations</button>
                <button onClick={() => handleViewComparative(tender._id)}>View Comparative</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tenders found.</p>
      )}
    </div>
  );
};

export default PersonalTender;
