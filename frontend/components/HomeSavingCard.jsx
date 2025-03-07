'use client';
import { useState, useEffect } from 'react';
import { getBudgetAndExpenses } from '@/app/script/expense.controller';

const HomeSavingCard = () => {
  const [budget, setBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { budget, totalExpenses } = await getBudgetAndExpenses();
        setBudget(budget);
        setTotalExpenses(totalExpenses);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-100 h-84">
      <h3 className="text-gray-500 text-sm">Your Budget</h3>
      <h2 className="text-3xl font-bold mt-1">${budget}</h2>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium bg-blue-500 px-3 py-1 rounded-full">
            Total Expenses
          </span>
          <span className="text-gray-700 text-sm font-medium">
            ${totalExpenses}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeSavingCard;
