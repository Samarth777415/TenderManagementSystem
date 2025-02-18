import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [tenders, setTenders] = useState([]);
  const [quotations, setQuotations] = useState({}); 
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return console.error('No token found');
        
        const userResponse = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(userResponse.data._id);

        const tendersResponse = await axios.get('http://localhost:5000/api/tenders/all');
        const sortedTenders = tendersResponse.data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setTenders(sortedTenders);

        // Fetch quotations after tenders are set
        const quotationsData = await fetchAllQuotations(sortedTenders, userResponse.data._id);
        setQuotations(quotationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchAllQuotations = async (tenders, userId) => {
    const quotationsData = {};
    await Promise.all(
      tenders.map(async (tender) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/quotations/${tender._id}/${userId}/status`
          );
          quotationsData[tender._id] = response.data;
        } catch (error) {
          console.warn(`Failed to fetch quotation for tender ID ${tender._id}:`, error);
        }
      })
    );
    return quotationsData;
  };

  const handleApply = (tenderId) => {
    navigate(`/tender/${tenderId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Tender Management</h2>
        <ul className="tender-stages">
          <li key="open">
            Open Tenders 
            <span className="badge">
              {tenders.filter(t => t.status === 'Open' && (!quotations[t._id] || quotations[t._id].status !== 'Submitted')).length}
            </span>
          </li>
          <li key="submitted">
            Submitted Tenders 
            <span className="badge">
              {tenders.filter(t => quotations[t._id]?.status === 'Submitted').length}
            </span>
          </li>
          <li key="awarded">
            Awarded Tenders 
            <span className="badge">
              {tenders.filter(t => quotations[t._id]?.status === 'Awarded').length}
            </span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <h3>Open Tenders</h3>
          <div className="top-bar-actions">
            <button className="filter-btn">🔍 Filter</button>
            <button className="sort-btn">⇅ Sort</button>
          </div>
        </div>

        {/* Tender Table */}
        <table className="tender-table">
          <thead>
            <tr>
              <th>Tender</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender) => {
              const userQuotation = quotations[tender._id];
              const isQuotationSubmitted = userQuotation?.status === 'Submitted';
              const isTenderAwarded = userQuotation?.status === 'Awarded';
              const isTenderNotAwarded = userQuotation?.status === 'Not Awarded'; // Check for Not Awarded status
            
              return (
                <tr key={tender._id}>
                  <td>{tender.title}</td>
                  <td>{tender.description}</td>
                  <td>{new Date(tender.deadline).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`status ${
                        isQuotationSubmitted
                          ? 'submitted'
                          : isTenderAwarded
                          ? 'awarded'
                          : isTenderNotAwarded
                          ? 'not-awarded'  // Add class for Not Awarded
                          : tender.status.toLowerCase()
                      }`}
                    >
                      {isQuotationSubmitted
                        ? 'Submitted'
                        : isTenderAwarded
                        ? 'Awarded'
                        : isTenderNotAwarded
                        ? 'Not Awarded'  // Display "Not Awarded"
                        : tender.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="apply-button"
                      onClick={() => handleApply(tender._id)}
                      disabled={isQuotationSubmitted || isTenderAwarded || isTenderNotAwarded} // Disable button if Not Awarded
                    >
                      {isQuotationSubmitted
                        ? 'Submitted'
                        : isTenderAwarded
                        ? 'Awarded'
                        : isTenderNotAwarded
                        ? 'Not Awarded' // Display "Not Awarded"
                        : 'Apply'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
      