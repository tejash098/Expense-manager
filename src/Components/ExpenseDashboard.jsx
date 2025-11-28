import React, { useState } from "react";
import "./ExpenseDashboard.css";
import { ExpenseData } from "./ExpenseData";

const ExpenseDashboard = () => {
  const [data, setData] = useState(ExpenseData);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });
  const [viewItem, setViewItem] = useState(null);

  const total = data.reduce((prev, curr) => prev + Number(curr.Amount), 0);
  const budget = 1500;
  const amountLeft = budget - total;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category || !form.date)
      return;

    const newItem = {
      Description: form.description,
      Amount: Number(form.amount),
      Category: form.category,
      Date: form.date,
    };

    setData([...data, newItem]);
    setForm({ description: "", amount: "", category: "", date: "" });
  };

  return (
    <div className="container">
      <h1 className="title">Expense Dashboard</h1>

      <div className="summary-boxes">
        <div className="box">
          <p>Total Expense</p>
          <h2>${total.toFixed(2)}</h2>
        </div>
        <div className="box">
          <p>Budget</p>
          <h2>${budget.toFixed(2)}</h2>
        </div>
        <div className="box">
          <p>Amount Left</p>
          <h2
            className={
              amountLeft < 0 ? "red" : amountLeft < 300 ? "yellow" : "green"
            }
          >
            ${amountLeft.toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="layout">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Add Transaction</h3>

          <label>Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />

          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select</option>
            <option>Income</option>
            <option>Food & Dining</option>
            <option>Utilities</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Misc</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <button type="submit">Add</button>
        </form>

        <div className="table-box">
          <h3>Transaction History</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.Date}</td>
                  <td>{item.Description}</td>
                  <td>{item.Category}</td>
                  <td>
                    {item.Category === "Income" ? "+" : "-"}
                    {item.Amount}
                  </td>
                  <td>
                    <button onClick={() => setViewItem(item)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewItem && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Transaction Details</h3>
            <p>
              <b>Description:</b> {viewItem.Description}
            </p>
            <p>
              <b>Amount:</b> {viewItem.Amount}
            </p>
            <p>
              <b>Category:</b> {viewItem.Category}
            </p>
            <p>
              <b>Date:</b> {viewItem.Date}
            </p>
            <button onClick={() => setViewItem(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDashboard;
