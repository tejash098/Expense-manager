import { ExpenseData } from "./ExpenseData";

const ExpenseDashboard = () => {
  let total = ExpenseData.reduce((prev, curr) => {
    return prev + Number(curr.Amount);
  }, 0);
  let budget = 1500;
  let amountLeft = budget - total;

  // Function to determine the text color/style for Amount Left
  const getAmountLeftStyles = () => {
    if (amountLeft < 0) {
      return "text-red-400"; // Over budget (lighter red for dark theme)
    } else if (amountLeft < budget * 0.2) {
      return "text-yellow-400"; // Low budget (yellow/orange for dark theme)
    } else {
      return "text-emerald-400"; // Healthy budget (lighter green for dark theme)
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 p-4 md:p-10 flex flex-col items-center font-sans">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-extrabold text-indigo-400 mb-12 text-center tracking-tight">
            💰 Expense Tracker Dashboard
          </h1>

          {/* Balance Cards (Dark Theme Look) */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
            {/* Current Total Expense Card */}
            <div className="flex-1 bg-gray-800 p-6 rounded-2xl shadow-2xl border-l-4 border-indigo-500 transition-transform duration-300 hover:scale-[1.01] hover:shadow-indigo-500/30">
              <p className="text-base font-medium text-gray-400">
                Current Total Expense
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
                <span className="text-indigo-400">${total.toFixed(2)}</span>
              </h2>
            </div>

            {/* Total Budget Card */}
            <div className="flex-1 bg-gray-800 p-6 rounded-2xl shadow-2xl border-l-4 border-emerald-500 transition-transform duration-300 hover:scale-[1.01] hover:shadow-emerald-500/30">
              <p className="text-base font-medium text-gray-400">
                Total Budget
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
                <span className="text-emerald-400">${budget.toFixed(2)}</span>
              </h2>
            </div>

            {/* Amount Left Card (Dynamic Color/Style) */}
            <div className={`flex-1 bg-gray-800 p-6 rounded-2xl shadow-2xl border-l-4 ${amountLeft < 0 ? 'border-red-500' : 'border-blue-500'} transition-transform duration-300 hover:scale-[1.01] hover:shadow-blue-500/30`}>
              <p className="text-base font-medium text-gray-400">
                Amount Left
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
                <span className={getAmountLeftStyles()}>
                  ${Math.round(amountLeft).toFixed(2)}
                </span>
              </h2>
            </div>
          </div>

          {/* Layout: Form and Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transaction Form - Dark Theme */}
            <div className="lg:col-span-1 bg-gray-800 p-8 rounded-2xl shadow-2xl h-fit border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">
                ➕ Add New Transaction
              </h3>
              
              <form className="space-y-5">
                {/* Description Input */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="e.g., Dinner, Client Payout"
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-150 shadow-inner"
                  />
                </div>

                {/* Amount Input */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-semibold text-gray-300 mb-1"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="e.g., 150.00"
                    step="0.01"
                    min="0"
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-150 shadow-inner"
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-gray-300 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 appearance-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-150 shadow-inner"
                  >
                    <option value="Income" className="bg-gray-800">Income</option>
                    <option value="Food & Dining" className="bg-gray-800">Food & Dining</option>
                    <option value="Utilities" className="bg-gray-800">Utilities</option>
                    <option value="Transport" className="bg-gray-800">Transport</option>
                    <option value="Entertainment" className="bg-gray-800">Entertainment</option>
                    <option value="Education" className="bg-gray-800">Education</option>
                    <option value="Health" className="bg-gray-800">Health</option>
                    <option value="Electronics" className="bg-gray-800">Electronics</option>
                    <option value="Misc" className="bg-gray-800">Miscellaneous</option>
                  </select>
                </div>

                {/* Date Input */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-semibold text-gray-300 mb-1"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-150 shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg shadow-indigo-500/50"
                >
                  Add Transaction
                </button>
              </form>
            </div>

            {/* Transaction Table - Dark Theme */}
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl shadow-2xl overflow-x-auto border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">
                📊 Transaction History
              </h3>

              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider rounded-tl-xl">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider rounded-tr-xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {/* Map over ExpenseData */}
                  {ExpenseData.map((ele, idx) => {
                    let { Description, Amount, Category, Date } = ele;
                    const isIncome = Category.toLowerCase() === 'income';

                    return (
                      <tr
                        className="hover:bg-gray-700 transition-colors"
                        key={idx}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {Date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {Description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                            isIncome
                              ? "bg-emerald-800 text-emerald-300"
                              : "bg-red-800 text-red-300"
                          }`}>
                            {Category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`font-semibold ${isIncome ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isIncome ? `+${Amount}` : `-${Amount}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          {/* You will add onClick={handleViewDetails} here */}
                          <button className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold p-2 rounded-lg hover:bg-gray-700 text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transaction Details Modal Structure - Dark Theme */}
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 opacity-0 pointer-events-none">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm transform scale-95 transition-transform duration-300 border border-gray-700">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
              <h4 className="text-2xl font-bold text-white">
                Transaction Details
              </h4>
              {/* You will add onClick={handleCloseModal} here */}
              <button className="text-gray-400 hover:text-white text-4xl font-light leading-none p-1 transition-colors">
                &times;
              </button>
            </div>

            {/* Static content for details (You will replace these spans with dynamic data) */}
            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="font-semibold text-gray-400">
                  Description:
                </span>
                <span className="font-medium text-white">
                  Monthly Salary
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold text-gray-400">Amount:</span>
                <span className="font-semibold text-emerald-400 text-xl">
                  +$5,500.00
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold text-gray-400">Category:</span>
                <span className="font-medium text-emerald-300 bg-emerald-800 px-3 py-1 rounded-lg text-sm">
                  Income
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold text-gray-400">Date:</span>
                <span className="font-medium text-white">
                  2025-11-01
                </span>
              </div>
            </div>
            <button className="mt-8 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseDashboard;