import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import TenderForm from './TenderForm'; // Import the TenderForm component
import TenderDetailsTable from './TenderDetailsTable'; // Import the TenderDetailsTable component
import './Dashboard.css';

const Dashboard = () => {
  const [tenders, setTenders] = useState([]);
  const [selectedTenderDetails, setSelectedTenderDetails] = useState(null); // State for selected tender details
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tenders/all');
      setTenders(response.data);
    } catch (error) {
      console.error('Error fetching tenders:', error);
    }
  };

  const addTender = (newTender) => {
    setTenders([...tenders, newTender]); // Update the state to include the new tender
  };

  // Navigate to tender details page
  const handleApply = (tenderId) => {
    navigate(`/tender/${tenderId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Tender Management</h2>
        <ul className="tender-stages">
          <li key="open">Open Tenders <span className="badge">{tenders.filter(t => t.status === 'Open').length}</span></li>
          <li key="submitted">Submitted Tenders <span className="badge">{tenders.filter(t => t.status === 'Submitted').length}</span></li>
          <li key="awarded">Awarded Tenders <span className="badge">{tenders.filter(t => t.status === 'Awarded').length}</span></li>
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
            {tenders.map((tender) => (
              <tr key={tender._id}>
                <td>{tender.title}</td>
                <td>{tender.description}</td>
                <td>{new Date(tender.deadline).toLocaleDateString()}</td>
                <td><span className={`status ${tender.status.toLowerCase()}`}>{tender.status}</span></td>
                <td>
                  <button className="apply-button" onClick={() => handleApply(tender._id)}>Apply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
