// TenderDetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TenderDetailPage.css';

const TenderDetailPage = () => {
  const { tenderId } = useParams();
  const [tenderDetails, setTenderDetails] = useState(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchTenderDetails();
    
  }, [tenderId]);

  const fetchTenderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tenders/${tenderId}/details`);
      console.log('Tender details response:', response.data); // Log the response
      setTenderDetails(response.data);
    } catch (error) {
      console.error('Error fetching tender details:', error);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmitPrice = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tenders/${tenderId}/details`, {
        price,
      });
      alert('Price updated successfully!');
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Failed to update price. Please try again.');
    }
  };

  // Process the tenderTable data
  const processTenderTableData = () => {
    if (!tenderDetails || !tenderDetails.tenderTable.length) {
      return [];
    }

    // Flatten the nested arrays and group by material
    const groupedData = {};
    tenderDetails.tenderTable.flat().forEach((row) => {
      const { columnName, columnValue } = row;
      if (columnName.includes('Material')) {
        groupedData[columnValue] = {};
      } else if (columnName.includes('Quantity')) {
        const lastKey = Object.keys(groupedData).pop();
        groupedData[lastKey].quantity = columnValue;
      } else if (columnName.includes('Price')) {
        const lastKey = Object.keys(groupedData).pop();
        groupedData[lastKey].price = columnValue;
      }
    });

    return Object.entries(groupedData).map(([material, { quantity, price }]) => ({
      material,
      quantity,
      price,
    }));
  };

  const tenderTableData = processTenderTableData();

  return (
    <div className="tender-detail-page">
      <h2>Tender Details</h2>
      {tenderDetails ? (
        <div>
          <table className="tender-detail-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{tenderDetails.title}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{tenderDetails.description}</td>
              </tr>
              <tr>
                <td>Deadline</td>
                <td>{new Date(tenderDetails.deadline).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{tenderDetails.status}</td>
              </tr>
            </tbody>
          </table>

          <h3>Tender Table Details</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {tenderTableData.length > 0 ? (
                tenderTableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.material}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <input
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Enter price"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No details available</td>
                </tr>
              )}
            </tbody>
          </table>

          <button className="submit-price-btn" onClick={handleSubmitPrice}>
            Submit Price
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TenderDetailPage;
