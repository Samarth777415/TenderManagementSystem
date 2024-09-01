import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TenderDetails.css";

const TenderDetails = () => {
  const [columns, setColumns] = useState(["Material", "Quantity", "Price"]);
  const [rows, setRows] = useState([["", "", ""]]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Getting tender ID from route parameters
  const navigate = useNavigate();

  // Function to handle adding a new row
  const addRow = () => {
    setRows([...rows, Array(columns.length).fill("")]);
  };

  // Function to handle removing a row
  const removeRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  // Function to handle adding a new column
  const addColumn = () => {
    setColumns([...columns, `Column ${columns.length + 1}`]);
    setRows(rows.map((row) => [...row, ""]));
  };

  // Function to handle removing a column
  const removeColumn = (index) => {
    if (columns.length > 1) {
      const updatedColumns = [...columns];
      updatedColumns.splice(index, 1);
      setColumns(updatedColumns);

      const updatedRows = rows.map((row) => {
        const newRow = [...row];
        newRow.splice(index, 1);
        return newRow;
      });
      setRows(updatedRows);
    }
  };

  // Function to handle header change
  const handleHeaderChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  // Function to handle cell change
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex] = value;
    setRows(updatedRows);
  };

  // Function to validate form data
  const validateFormData = () => {
    if (columns.some((col) => col.trim() === "")) {
      alert("Column names cannot be empty.");
      return false;
    }
    for (let row of rows) {
      if (row.some((cell) => cell.trim() === "")) {
        alert("Cell values cannot be empty.");
        return false;
      }
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!validateFormData()) return; // Validate before submission

    setLoading(true); // Set loading to true

    // Prepare tenderDetailsData according to the schema
    const tenderTable = rows.map(row =>
      row.map((cell, index) => ({
        columnName: columns[index],
        columnValue: cell
      }))
    );

    const tenderDetailsData = { tenderTable };

    try {
      const response = await axios.put(`http://localhost:5000/api/tenders/${id}/details`, tenderDetailsData);
      console.log("Tender details added successfully:", response.data);
      alert("Tender details added successfully!");
      navigate('/'); // Redirect to Dashboard after submission
    } catch (error) {
      console.error("Error creating tender details:", error.response?.data || error.message);
      alert("Failed to add tender details. Please check the console for more information.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="tender-details">
      <h2>Add Details to Tender: {id}</h2>
      <table>
        <thead>
          <tr>
            {columns.map((col, colIndex) => (
              <th key={colIndex}>
                <input
                  type="text"
                  value={col}
                  onChange={(e) => handleHeaderChange(colIndex, e.target.value)}
                />
                <button onClick={() => removeColumn(colIndex)} disabled={columns.length <= 1 || loading}>
                  Remove Column
                </button>
              </th>
            ))}
            <th>
              <button onClick={addColumn} disabled={loading}>Add Column</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    disabled={loading}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => removeRow(rowIndex)} disabled={rows.length <= 1 || loading}>
                  Remove Row
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={columns.length + 1}>
              <button onClick={addRow} disabled={loading}>Add Row</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Tender Details"}
      </button>
    </div>
  );
};

export default TenderDetails;
