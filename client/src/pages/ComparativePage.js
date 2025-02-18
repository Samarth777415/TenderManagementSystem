import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ComparativePage.css'; // Create and import CSS for styling

const ComparativePage = () => {
  const [quotations, setQuotations] = useState([]);
  const [quotation, setQuotation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tenderId } = useParams();
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
        setQuotation(quotationsWithUserDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quotations:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [tenderId]);
  // useEffect(() => {
  //   const fetchQuotations = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/quotations/${tenderId}/comparative`);
  //       setQuotations(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching quotations:', error.response?.data || error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchQuotations();
  // }, [tenderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comparative-container">
      <h2>Comparative Table for Tender: {tenderId}</h2>
      {quotations.length > 0 ? (
        <table className="comparative-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Quotation Amount</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {quotation.map((quotation) => (
              <tr key={quotation._id}>
                <td>{quotation.creatorName}</td>
                <td>{quotation.totalSum}</td>
                <td>{quotation.creatorGST}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No quotations found.</p>
      )}
    </div>
  );
};

export default ComparativePage;
