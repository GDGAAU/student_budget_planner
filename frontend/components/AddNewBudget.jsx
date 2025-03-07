"use client";
import { updateUser } from "@/app/script/user.controller";
import React, { useState } from "react";

const mock = {
  month: "March",
  budget: "1000",
  spent: "500",
};

const AddNewBudget = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    const intValue = parseFloat(inputValue);
    await updateUser(intValue);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
      <h3 className="text-gray-500 text-sm">Mark Your Budget</h3>
      <h2 className="text-3xl font-bold mt-1">Add New Budget</h2>

      <div className="mt-1 space-y-3">
        {/* Earned Bar */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium bg-green-600 px-2 my-4 rounded-full">
            New
          </span>
        </div>
        <div className="w-full h-3 rounded-full pb-10 flex items-center">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-8 border-2 border-[#3d812883] rounded-4xl outline-0 px-4"
            placeholder="Enter amount"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-800 text-white mx-2 px-4 py-2 rounded-3xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewBudget;
