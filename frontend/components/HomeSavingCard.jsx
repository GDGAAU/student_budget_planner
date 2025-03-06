import React from 'react';

const mock = {
  month: 'March',
  budget: '1000',
  spent: '500',
};

const SavingsCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
      <h3 className="text-gray-500 text-sm">March Savings</h3>
      <h2 className="text-3xl font-bold mt-1">$7,456.00</h2>

      <div className="mt-4 space-y-3">
        {/* Earned Bar */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium bg-blue-500 px-3 py-1 rounded-full">
            Earned
          </span>
          <span className="text-gray-700 text-sm font-medium">$10,500.00</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-blue-500 rounded-full"
            style={{ width: '70%' }}
          ></div>
        </div>

        {/* Spend Bar */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium bg-red-400 px-3 py-1 rounded-full">
            Spend
          </span>
          <span className="text-gray-700 text-sm font-medium">$10,500.00</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-red-400 rounded-full"
            style={{ width: '20%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCard;
