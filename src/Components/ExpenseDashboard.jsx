import React, { useState } from "react";
import "./ExpenseDashboard.css";

const ExpenseDashboard = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const [viewItem, setViewItem] = useState(null);

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? Number(saved) : 1500;
  });

  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget);

  const total = data.reduce((sum, item) => {
    const amount = Number(item.Amount) || 0;
    return item.Category === "Income" ? sum - amount : sum + amount;
  }, 0);

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

    const updated = [...data, newItem];
    setData(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));

    setForm({ description: "", amount: "", category: "", date: "" });
  };

  const startEditBudget = () => {
    setBudgetInput(budget);
    setEditingBudget(true);
  };

  const saveBudget = () => {
    const value = Number(budgetInput);
    if (!isNaN(value) && value >= 0) {
      setBudget(value);
      localStorage.setItem("budget", value);
    }
    setEditingBudget(false);
  };

  const handleDelete = (item) => {
    const updated = data.filter((i) => i !== item);
    setData(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1 className="title">Expense Dashboard</h1>

      <div className="summary-boxes">
        <div className="box">
          <p>Total Expense</p>
          <h2>₹{total.toFixed(2)}</h2>
        </div>

        <div className="box">
          <p>Budget</p>

          {!editingBudget ? (
            <>
              <h2>₹{budget.toFixed(2)}</h2>
              <button onClick={startEditBudget}>Edit</button>
            </>
          ) : (
            <>
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
              />
              <button onClick={saveBudget}>OK</button>
            </>
          )}
        </div>

        <div className="box">
          <p>Amount Left</p>
          <h2
            className={
              amountLeft < 0 ? "red" : amountLeft < 300 ? "yellow" : "green"
            }
          >
            ₹{amountLeft.toFixed(2)}
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
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
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
                    {Math.abs(item.Amount)}
                  </td>
                  <td className="action-buttons">
                    <button onClick={() => setViewItem(item)}>View</button>
                    <button onClick={() => handleDelete(item)}>Delete</button>
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
