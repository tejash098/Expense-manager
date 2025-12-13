# Expense Dashboard

A simple and interactive Expense Dashboard application built using **React**. Users can add expenses, view transaction history, and track their budget.

---

### 🚀 Features

✔ Add new expenses with description, amount, category & date
✔ View transaction history in a table format
✔ Modal popup to view full expense details
✔ Automatic total calculation
✔ Budget tracking with remaining amount indicator
✔ Dynamic color alert based on remaining budget
✔ Fully responsive UI using custom CSS

---

### 🛠️ Tech Stack

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| React JS       | Frontend UI                |
| JavaScript ES6 | Logic & Component Handling |
| CSS            | Styling                    |
| useState Hook  | State Management           |

---

### 📂 Project Structure

```
src/
 ├── Components/
 │    ├── ExpenseDashboard.jsx
 │    ├── ExpenseDashboard.css
 │    └── ExpenseData.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

### 📦 Installation & Setup

Follow these steps to run the app locally:

```bash
# Clone the repository
git clone https://github.com/your-username/expense-dashboard.git

# Move inside project folder
cd expense-dashboard

# Install dependencies
npm install

# Start the development server
npm start
```

Your app will be available at:

```
http://localhost:3000/
```

---

### ✨ Usage

1. Enter Description, Amount, Category & Date
2. Click **Add** to insert a transaction
3. Check total expense, budget, and remaining balance
4. Click **View** to see complete details in modal

---

### 📊 Budget Rules

| Amount Left | Color  |
| ----------- | ------ |
| > 300       | Green  |
| 0 – 300     | Yellow |
| < 0         | Red    |

---
