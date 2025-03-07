"use client";
import { getAllExpenses } from "@/app/script/expense.controller";
import React, { useEffect, useState } from "react";

const BudgetCard = ({ category, expense, amount, date }) => {
  // Format date to display it properly (example: "27/10/2025")
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="flex text-[#dd7600] items-center justify-between bg-[#ffffff18] shadow-md p-2 w-full max-w-lg border border-gray-200 px-8">
      {/* Category Name & Icon */}
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm text-gray-500">Expense</p>
          <h3 className="text-lg font-semibold">{category}</h3>
        </div>
      </div>

      {/* Amount */}
      <div className="text-right">
        <p className="text-sm text-gray-500">Amount</p>
        <p className="text-xl font-bold">${expense}</p>
      </div>

      {/* Date */}
      <div>
        <p className="text-sm text-gray-500">Date</p>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default function BudgetPage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch the expenses from getAllExpenses function
    const fetchData = async () => {
      const expensesData = await getAllExpenses();
      console.log("Expenses fetched successfully:", expensesData);
      setExpenses(expensesData);
    };

    fetchData();
  }, []);

  // This will handle the dynamic generation of BudgetCards from fetched data
  return (
    <div className="p-6 flex flex-col gap-4 items-center ">
      {expenses.map((expenseData) => (
        <BudgetCard
          key={expenseData.id}
          category={expenseData.category} // Replace this with category name if needed
          expense={expenseData.amount}
          amount={expenseData.amount} // You may also want to use this field in another way
          date={expenseData.date} // Assuming the expense data has a date field
        />
      ))}
    </div>
  );
}
