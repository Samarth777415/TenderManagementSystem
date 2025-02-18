import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TenderQuotations.css';

const TenderQuotations = () => {
  const { tenderId } = useParams();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quotations/${tenderId}/all`);
        const quotationsWithUserDetails = await Promise.all(
          response.data.map(async (quotation) => {
            const userResponse = await axios.get(`http://localhost:5000/api/auth/users/${quotation.createrId}`);
            return {
              ...quotation,
              creatorName: userResponse.data.username,
              creatorGST: userResponse.data.gstNumber,
            };
          })
        );
        setQuotations(quotationsWithUserDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quotations:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [tenderId]);

  const handleQuotationClick = (quotation) => {
    setSelectedQuotation(quotation);
  };

  const handleCloseModal = () => {
    setSelectedQuotation(null);
  };

  const handleAwardQuotation = async () => {
    if (!selectedQuotation) return;

    try {
      await axios.patch(`http://localhost:5000/api/quotations/${selectedQuotation._id}/award`, {
        tenderId, // Pass the tenderId to identify other quotations
      });

      alert('Quotation awarded successfully.');
      // Refresh quotations to reflect the updated status
      const updatedQuotations = quotations.map((quotation) =>
        quotation._id === selectedQuotation._id
          ? { ...quotation, status: 'awarded' }
          : { ...quotation, status: 'not awarded' }
      );
      setQuotations(updatedQuotations);
      setSelectedQuotation({ ...selectedQuotation, status: 'awarded' });
    } catch (error) {
      console.error('Error awarding quotation:', error.response?.data || error.message);
      alert('Failed to award quotation.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tender-quotations-container">
      {quotations.length > 0 ? (
        <ul className="quotation-list">
          {quotations.map((quotation) => (
            <li key={quotation._id} onClick={() => handleQuotationClick(quotation)}>
              <h3>{quotation.creatorName} (GST: {quotation.creatorGST})</h3>
              <p>Total Sum: {quotation.totalSum}</p>
              <p>Status: {quotation.status || 'Pending'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotations found for this tender.</p>
      )}

      {selectedQuotation && (
        <div className="quotation-modal">
          <button onClick={handleCloseModal} className="close-button">Close</button>
          <h2>Quotation Details</h2>
          <p><strong>Creator Name:</strong> {selectedQuotation.creatorName}</p>
          <p><strong>Creator GST:</strong> {selectedQuotation.creatorGST}</p>
          <p><strong>Total Sum:</strong> {selectedQuotation.totalSum}</p>

          <h3>Tender Table</h3>
          <table className="tender-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedQuotation.tenderTable.map((row, index) => (
                <tr key={index}>
                  <td>{row.material}</td>
                  <td>{row.quantity}</td>
                  <td>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Award Button */}
          <button
            className="award-button"
            onClick={handleAwardQuotation}
            disabled={selectedQuotation.status === 'awarded'}
          >
            {selectedQuotation.status === 'awarded' ? 'Awarded' : 'Award'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TenderQuotations;
