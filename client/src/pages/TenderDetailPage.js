import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TenderDetailPage.css';

const TenderDetailPage = () => {
  const { tenderId } = useParams();
  const [tenderDetails, setTenderDetails] = useState(null);
  const [price, setPrice] = useState({});
  const [tenderTableData, setTenderTableData] = useState([]);
  const [userId, setUserId] = useState('');

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
    fetchTenderDetails();
  }, [tenderId]);

  const fetchTenderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tenders/${tenderId}/details`);
      setTenderDetails(response.data);
      const processedData = processTenderTableData(response.data.tenderTable);
      setTenderTableData(processedData);
    } catch (error) {
      console.error('Error fetching tender details:', error);
    }
  };

  const processTenderTableData = (tenderTable) => {
    if (!tenderTable || !tenderTable.length) {
      return [];
    }

    const groupedData = {};
    tenderTable.flat().forEach((row) => {
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

  const handlePriceChange = (e, material) => {
    setPrice((prevPrices) => ({
      ...prevPrices,
      [material]: e.target.value,
    }));
  };

  const handleSubmitPrice = async () => {
    try {
      const totalSum = Object.values(price).reduce((sum, priceValue) => sum + parseFloat(priceValue || 0), 0);

      const quotationData = {
        createrId: userId, 
        tenderId: tenderId,
        tenderTable: tenderTableData.map((item) => ({
          material: item.material,
          quantity: item.quantity,
          price: price[item.material] || item.price,
        })),
        status: 'Submitted',
        totalSum,
      };

      console.log('Submitting Quotation:', quotationData);

      const response = await axios.post('http://localhost:5000/api/quotations/create', quotationData);
      alert('Quotation created successfully!');
      console.log('Response from server:', response.data);

      // After successfully submitting the quotation, update the tender status to "Submitted"
      // await axios.patch(`http://localhost:5000/api/quotations/${tenderId}/status`, { status: 'Submitted' });
      
      // Update the tender details state to reflect the status change
      // setTenderDetails(prevDetails => ({
      //   ...prevDetails,
      //   status: 'Submitted',
      // }));
      
    } catch (error) {
      console.error('Error creating quotation:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to create quotation. Please check the console for more information.');
    }
  };

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
                        value={price[item.material] || item.price || ""}
                        onChange={(e) => handlePriceChange(e, item.material)}
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

          <button className="button" onClick={handleSubmitPrice}>
            Submit Quotation
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TenderDetailPage;
