import React, { useState } from 'react';
import axios from 'axios';
import './FinancialData.css';

const FinancialData = () => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    type: 'expense', // expense or income
    budget: '',
    debt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/financial-data', formData);
      if (response.data.success) {
        alert('Financial data saved successfully!');
      } else {
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error saving financial data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="financial-data-container">
      <h2>Enter Financial Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:<input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount: <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date: <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type:<select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label>
          Budget Goal:<input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
        </label>
        <label>
          Debt:<input
            type="number"
            name="debt"
            value={formData.debt}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FinancialData;
