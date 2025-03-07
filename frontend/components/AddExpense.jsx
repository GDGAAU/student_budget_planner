"use client";
import { useState, useEffect } from "react";
import { getBudgetAndExpenses } from "@/app/script/expense.controller";

const Expense = () => {
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
    <div
      className="bg-gradient-to-tl from-[#ee7a7a86] to-[#ffffff] p-6 rounded-2xl shadow-lg w-100 mx-10"
      onClick={() => (window.location.href = "/category")}
    >
      <h3 className="text-gray-500 text-sm">click here to add expense</h3>
      <h2 className="text-3xl font-bold mt-1">Add Expense</h2>

      <div className="mt-4 space-y-3">
        <div className="flex items-center ">
          <span className="mx-1 text-white text-sm font-medium bg-[#75197988] px-3 py-1 rounded-full">
            Food
          </span>
          <span className="mx-1 text-white text-sm font-medium bg-[#75197988] px-3 py-1 rounded-full">
            Cloth
          </span>
          <span className="mx-1 text-white text-sm font-medium bg-[#75197988] px-3 py-1 rounded-full">
            Transport
          </span>
          <span className="mx-1 text-white text-sm font-medium bg-[#75197988] px-3 py-1 rounded-full">
            Books
          </span>
        </div>
      </div>
    </div>
  );
};

export default Expense;
