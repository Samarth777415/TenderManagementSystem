import React, { useState, useEffect } from 'react';

const TenderDetailsTable = ({ tenderDetails, onUpdatePrice }) => {
  // Ensure tenderDetails.details is initialized properly
  const initialDetails = tenderDetails.details || {};  // Default to an empty object if undefined
  const [updatedDetails, setUpdatedDetails] = useState(initialDetails);

  useEffect(() => {
    // Update state whenever tenderDetails prop changes
    setUpdatedDetails(tenderDetails.details || {});
  }, [tenderDetails]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdatePrice(updatedDetails);
  };

  return (
    <div className="tender-details">
      <h3>Tender Details: {tenderDetails.title}</h3>
      <table>
        <tbody>
          <tr>
            <td>Description</td>
            <td>{tenderDetails.description || 'N/A'}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              <input
                type="text"
                name="price"
                value={updatedDetails.price || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          {/* Add more fields as needed */}
        </tbody>
      </table>
      <button onClick={handleUpdate}>Update Price</button>
    </div>
  );
};

export default TenderDetailsTable;
